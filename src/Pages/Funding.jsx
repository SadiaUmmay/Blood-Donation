import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import FundList from './FundList';

const Funding = () => {
    const axiosInstance = useAxios();
    const {user} = useContext(AuthContext)
    const navigate= useNavigate()

    const handleCheckout = (e) => {
        e.preventDefault();
        const fundAmount = e.target.fundAmount.value;
        const fundEmail = user?.email;
        const fundName = user?.displayName

        const formData = {
            fundAmount,
            fundEmail,
            fundName
        }

        axiosInstance.post('/create-payment-checkout', formData)
        .then(res=>{
            console.log(res.data)
         window.location.href=   res.data.url
        })
    }
    return (
        <div>
            <FundList></FundList>

            <form onSubmit={handleCheckout} className=" max-w-7xl mx-auto my-10">
                {/* FUND AMOUNT */}
                <input
                    type="number"
                    name="fundAmount"
                    placeholder="Enter Fund Amount (BDT)"
                    className="input input-bordered mr-2"
                    min="5"
                    required
                />

                <button
                    // onClick={() => setOpen(true)}
                    className="btn btn-primary"
                >
                    💳 Give Fund
                </button>
            </form>

        </div>
    );
};

export default Funding;