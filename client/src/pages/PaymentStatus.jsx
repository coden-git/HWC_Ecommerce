import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPaymentStatus } from "../api/api";

const PaymentStatus = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const data = await getPaymentStatus(paymentId);
        setSuccess(data.success);
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [paymentId]);

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [success, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-center">
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-lg mb-2">Your order has been placed and will be shipped soon.</p>
          <p className="text-sm">Redirecting in {countdown} seconds...</p>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-lg">There was an issue with your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;