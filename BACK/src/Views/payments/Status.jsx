import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHome, FaReceipt, FaSpinner } from 'react-icons/fa';
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axios-client';

function Status() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, getAuthUser, authUser } = useStateContext();
  const [isVisible, setIsVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Get payment details from URL params
  const paymentId = searchParams.get('payment_id');
  const amount = searchParams.get('amount');
  const subscriptionName = searchParams.get('subscription');

  useEffect(() => {
      setLoading(true);
      axiosClient.get('check/user/status')
      .then((res) => {
        getAuthUser();
        setPaymentStatus(res.data.status);
      })
      .catch(({response}) => {
        console.log(response.message);
      })
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    // Trigger animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [paymentId]);

  const handleGoHome = () => {
    navigate(`/filter/users?type=${authUser?.type === 1 ? 0 : 1}`);
  };

  // Render different icon based on payment status
  const renderStatusIcon = () => {
    if (loading) {
      return (
        <div className={`mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 transform transition-all duration-500 delay-200 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
          <FaSpinner className="text-blue-600 text-4xl animate-spin" />
        </div>
      );
    }
    
    if (paymentStatus === 'success') {
      return (
        <div className={`mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 transform transition-all duration-500 delay-200 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
          <FaCheckCircle className="text-green-600 text-4xl animate-pulse" />
        </div>
      );
    } else {
      return (
        <div className={`mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 transform transition-all duration-500 delay-200 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
          <FaTimesCircle className="text-red-600 text-4xl animate-pulse" />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>
        {/* Status Icon - Dynamic based on status */}
        {renderStatusIcon()}

        {/* Status Message */}
        <div className={`transform transition-all duration-500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {loading ? "გთხოვთ დაელოდოთ..." : 
             paymentStatus === 'success' ? "გადახდა წარმატებით დასრულდა" : 
             "გადახდა ვერ დასრულდა"}
          </h1>
        </div>

        {/* Payment Details */}
        <div className={`bg-gray-50 rounded-lg p-4 mb-6 text-left transform transition-all duration-500 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <FaReceipt className="mr-2" />
            დეტალები
          </h3>
          <div className="space-y-2 text-sm">
            {paymentId && (
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="text-gray-900 font-mono">{paymentId}</span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">თანხა:</span>
                <span className="text-gray-900 font-semibold">${amount}</span>
              </div>
            )}
            {subscriptionName && (
              <div className="flex justify-between">
                <span className="text-gray-600">სერვისი:</span>
                <span className="text-gray-900 font-semibold">{subscriptionName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">სტატუსი:</span>
              <span className={`font-semibold ${loading ? 'text-blue-600' : paymentStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {loading ? 'მიმდინარეობს დამუშავება...' : paymentStatus === 'success' ? 'დასრულებული' : 'წარუმატებელი'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">თარიღი:</span>
              <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* User Info - Only show if payment was successful */}
        {!loading && paymentStatus === 'success' && user && (
          <div className={`bg-blue-50 rounded-lg p-4 mb-6 transform transition-all duration-500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-sm text-gray-600">
              სერვისი გააქტიურებულია: 
              <span className="font-semibold text-gray-900 ml-1">
                {user.name || user.email}
              </span>
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className={`transform transition-all duration-500 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button
            onClick={handleGoHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 transform active:scale-95 shadow-lg hover:shadow-xl"
          >
            <FaHome className="mr-2" />
            დეშბორდზე გადასვლა
          </button>
        </div>

        {/* Footer Note */}
        <div className={`transform transition-all duration-500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* <p className="text-xs text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Status;