const axios = require('axios');

const PINCODE_API_BASE_URL = 'https://api.postalpincode.in/pincode';

const normalizePostOffices = (postOffices = []) =>
  postOffices.map((office) => ({
    name: office?.Name || null,
    branchType: office?.BranchType || null,
    deliveryStatus: office?.DeliveryStatus || null,
    district: office?.District || null,
    division: office?.Division || null,
    state: office?.State || null,
    region: office?.Region || null,
    country: office?.Country || null,
    pincode: office?.Pincode || null,
  }));

const getLocationByPincode = async (req, res) => {
  const { pincode } = req.params;

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return res.status(400).json({
      success: false,
      message: 'A valid 6-digit pincode is required',
    });
  }

  try {
    const url = `${PINCODE_API_BASE_URL}/${pincode}`;
    const { data } = await axios.get(url, {
      timeout: 5000,
    });

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(502).json({
        success: false,
        message: 'Unexpected response from postal service',
      });
    }

    const [result] = data;

    if (result?.Status !== 'Success' || !Array.isArray(result?.PostOffice) || result.PostOffice.length === 0) {
      return res.status(404).json({
        success: false,
        message: result?.Message || 'No location data found for the provided pincode',
      });
    }

    const primaryOffice = result.PostOffice[0];

    return res.status(200).json({
      success: true,
      message: 'Location data retrieved successfully',
      data: {
        state: primaryOffice.State,
        city: primaryOffice.District,
        region: primaryOffice.Region,
        country: primaryOffice.Country,
        offices: normalizePostOffices(result.PostOffice),
      },
    });
  } catch (error) {
    const statusCode = error?.response?.status || 500;
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Failed to fetch location data for the provided pincode';

    return res.status(statusCode >= 400 && statusCode < 600 ? statusCode : 500).json({
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = {
  getLocationByPincode,
};
