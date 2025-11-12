import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Button } from '../components';
import { fetchCarts, dispatchCart } from '../api/api';

const PAGE_SIZE = 10;

const ShippingDashboard = () => {
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ name: '', phoneNumber: '', startDate: '', endDate: '' });
  const [page, setPage] = useState(1);
  const [carts, setCarts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: PAGE_SIZE, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatchingUuid, setDispatchingUuid] = useState(null);
  const [dispatchAlert, setDispatchAlert] = useState(null);

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Shipping Dashboard' },
    ],
    []
  );

  const loadCarts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCarts({
        status: 'PLACED',
        name: appliedFilters.name || undefined,
        phoneNumber: appliedFilters.phoneNumber || undefined,
        startDate: appliedFilters.startDate || undefined,
        endDate: appliedFilters.endDate || undefined,
        pageNumber: page,
      });

      if (!response?.success) {
        throw new Error(response?.message || 'Failed to load carts');
      }

      setCarts(response.data || []);
      setPagination(
        response.pagination || {
          page,
          pageSize: PAGE_SIZE,
          total: Array.isArray(response.data) ? response.data.length : 0,
          pages: 1,
        }
      );
    } catch (err) {
      console.error('Failed to fetch carts:', err);
      setCarts([]);
      setPagination({ page: 1, pageSize: PAGE_SIZE, total: 0, pages: 0 });
      setError(err?.response?.data?.message || err?.message || 'Unable to load carts');
    } finally {
      setLoading(false);
    }
  }, [appliedFilters.name, appliedFilters.phoneNumber, page]);

  useEffect(() => {
    loadCarts();
  }, [loadCarts]);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setPage(1);
      setAppliedFilters({
        name: searchName.trim(),
        phoneNumber: searchPhone.trim(),
        startDate,
        endDate,
      });
      setDispatchAlert(null);
    },
    [searchName, searchPhone]
  );

  const handleResetFilters = useCallback(() => {
    setSearchName('');
    setSearchPhone('');
    setStartDate('');
    setEndDate('');
    setAppliedFilters({ name: '', phoneNumber: '', startDate: '', endDate: '' });
    setPage(1);
    setDispatchAlert(null);
  }, []);

  const totalPages = Math.max(1, pagination?.pages || 1);

  const canGoPrev = page > 1 && !loading;
  const canGoNext = page < totalPages && !loading;
  const resetDisabled =
    loading ||
    (!searchName.trim() &&
      !searchPhone.trim() &&
      !startDate &&
      !endDate &&
      !(appliedFilters.name || appliedFilters.phoneNumber || appliedFilters.startDate || appliedFilters.endDate));

  const handleDispatch = useCallback(
    async (uuid) => {
      if (!uuid) {
        return;
      }

      setDispatchAlert(null);
      setDispatchingUuid(uuid);

      try {
        const response = await dispatchCart(uuid);

        if (!response?.success) {
          throw new Error(response?.message || 'Failed to update cart');
        }

        setDispatchAlert({ type: 'success', message: 'Cart marked as shipped successfully.' });
        await loadCarts();
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Unable to dispatch cart.';
        setDispatchAlert({ type: 'error', message });
      } finally {
        setDispatchingUuid(null);
      }
    },
    [loadCarts]
  );

  const formatDateTime = useCallback((value) => {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (err) {
      return value;
    }
  }, []);

  const renderCartRow = (cart) => {
    const isDispatching = dispatchingUuid === cart.uuid;
    const itemSummary = (cart?.products || [])
      .map((product) => `${product?.title ?? 'Untitled'} × ${product?.quantity ?? 0}`)
      .join(', ');

    return (
      <tr key={cart.uuid} className="border-b border-gray-100 hover:bg-green-50/40 transition-colors">
        <td className="px-4 py-4 text-sm text-gray-600">{formatDateTime(cart.createdAt)}</td>
        <td className="px-4 py-4 text-sm font-mono text-gray-900 break-all">{cart.orderNumber}</td>
        <td className="px-4 py-4 text-sm text-gray-900">{cart.name || '—'}</td>
        <td className="px-4 py-4 text-sm text-gray-700">{cart.number || '—'}</td>
        <td className="px-4 py-4 text-sm text-gray-600">{cart.totalItems ?? cart.products?.reduce((acc, item) => acc + (item.quantity || 0), 0) ?? 0}</td>
        <td className="px-4 py-4 text-sm text-gray-900 font-semibold">₹{(cart.finalTotal ?? 0).toFixed(2)}</td>
        <td className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">{cart.cartStatus}</td>
        <td className="px-4 py-4 text-sm">
          {cart.cartStatus === 'PLACED' ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleDispatch(cart.uuid)}
              disabled={isDispatching || loading}
            >
              {isDispatching ? 'Shipping…' : 'Ship now'}
            </Button>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">{itemSummary || 'No products listed'}</td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipping Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Review all carts that have been placed and prepare them for dispatch.
            </p>
          </div>
        </div>

        <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search-name">
                Customer name
              </label>
              <input
                id="search-name"
                type="text"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                placeholder="Search by name"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search-phone">
                Phone number
              </label>
              <input
                id="search-phone"
                type="text"
                value={searchPhone}
                onChange={(event) => setSearchPhone(event.target.value.replace(/[^\d+\-\s]/g, ''))}
                placeholder="Search by phone"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="start-date">
                Start date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                max={endDate || undefined}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="end-date">
                End date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                min={startDate || undefined}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="lg:col-span-2 flex items-end gap-3">
              <Button type="submit" variant="primary" size="md" disabled={loading}>
                {loading ? 'Searching…' : 'Search'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleResetFilters}
                disabled={resetDisabled}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-hidden">
          {dispatchAlert && (
            <div
              className={`mx-4 mt-4 rounded-xl border px-4 py-3 text-sm ${
                dispatchAlert.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-red-200 bg-red-50 text-red-600'
              }`}
            >
              {dispatchAlert.message}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Placed on
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Products
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {loading && (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">
                      Loading carts…
                    </td>
                  </tr>
                )}

                {!loading && error && (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-red-500">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && carts.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500">
                      No placed carts found for the selected filters.
                    </td>
                  </tr>
                )}

                {!loading && !error && carts.length > 0 && carts.map((cart) => renderCartRow(cart))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 bg-green-50 border-t border-green-100">
            <p className="text-sm text-gray-600">
              Showing page <span className="font-semibold text-gray-900">{pagination?.page ?? page}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalPages}</span> —{' '}
              <span className="font-semibold text-gray-900">{pagination?.total ?? 0}</span> placed carts
            </p>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={!canGoPrev}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPage((current) => current + 1)}
                disabled={!canGoNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDashboard;
