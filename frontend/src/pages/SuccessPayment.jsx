import React from 'react'
import successImg from '../assest/success.gif'
import { Link } from 'react-router-dom'

const SuccessPayment = () => {
    return (
        <div className='p-4 m-1 bg-slate-200 w-full mx-auto max-w-md flex flex-col items-center justify-center'>
            <img src={successImg}
                width={150} height={150} />
            <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
            <Link to={"/order"} className='p-2 px-3 border-green-700 text-green-600 border-2 mt-5 
            rounded font-semibold hover:bg-green-600 hover:text-white'>
                See Order
            </Link>
        </div>
    )
}

export default SuccessPayment