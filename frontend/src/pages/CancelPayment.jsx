import React from 'react'
import cancelImg from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const CancelPayment = () => {
    return (

        <div className='p-4 m-1 bg-slate-200 w-full mx-auto max-w-md flex flex-col items-center justify-center'>
            <img src={cancelImg}
                width={150} height={150} />
            <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
            <Link to={"/cart"} className='p-2 px-3 border-red-700 text-red-600 border-2 mt-5 
            rounded font-semibold hover:bg-red-600 hover:text-white'>
                Back to Cart
            </Link>
        </div>

    )
}

export default CancelPayment