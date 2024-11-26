import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/dsiplayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-bold'>
                        {displayCurrency(data.sellingPrice)}
                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 cursor-pointer 
                    hover:text-white rounded-full' onClick={() => setEditProduct(true)}>
                        <MdModeEdit />
                    </div>
                </div>

            </div>
            {
                editProduct && (<AdminEditProduct productData={data}
                    onClose={() => setEditProduct(false)} fetchdata={fetchdata} />)
            }

        </div>

    )
}

export default AdminProductCard
