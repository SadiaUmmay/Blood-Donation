import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get('session_id');
  const axiosInstance = useAxios();
  const { setFunds } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionID) return;

    const postPayment = async () => {
      try {
        const res = await axiosInstance.post(`/success-payment?session_id=${sessionID}`);
        console.log("Payment Success response:", res.data);

      
        if (res.data.success && res.data.payment) {
          setFunds(prev => [res.data.payment, ...prev]); 
        }

       
        setTimeout(() => {
          navigate('/funding'); 
        }, 2000);

      } catch (err) {
        console.error(err);
      }
    };

    postPayment();
  }, [sessionID, axiosInstance, setFunds, navigate]);

  return (
    <div className="text-center my-10">
      <h2 className="text-2xl font-bold">Payment Successful! 🎉</h2>
     
    </div>
  );
};

export default PaymentSuccess;
