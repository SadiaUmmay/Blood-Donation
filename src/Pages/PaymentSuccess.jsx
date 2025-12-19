import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get('session_id')
    const axiosInstance = useAxios();

    useEffect(()=>{
        axiosInstance.post(`/success-payment?session_id=${sessionID}`)
        .then(res=>{
            console.log(res.data)
        })
    },[axiosInstance, sessionID])
    return (
        <div>
            success
        </div>
    );
};

export default PaymentSuccess;


