import React, { useState, useEffect } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/dsiplayCurrency';
import { FaTrash } from "react-icons/fa6";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProductCard = ({ data, fetchdata }) => {

    const [res, setRes] = useState([])
    const [editProduct, setEditProduct] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(true)

    const fetchDeleteProduct = async (id) => {
        const response = await fetch(SummaryApi.adminDeleteProduct.url, {
            method: SummaryApi.adminDeleteProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        })

        const dataResponse = await response.json()

        if (dataResponse.success) {
            toast.success(dataResponse.message)
            fetchdata()
        }
    }

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-bold'>
                        {displayCurrency(data.sellingPrice)}
                    </p>

                    <div className='flex lg:flex-row flex-col'>
                        <div className='w-fit p-2 ml-auto bg-green-200 hover:bg-green-600 cursor-pointer 
                    hover:text-white rounded-full' onClick={() => setEditProduct(true)}>
                            <MdModeEdit />
                        </div>
                        <div className='w-fit p-2  bg-red-400 hover:bg-red-600 cursor-pointer 
                    hover:text-white rounded-full'
                            onClick={() => {
                                setDeleteProduct(true)
                                fetchDeleteProduct(data?._id)
                            }}>
                            <FaTrash />
                        </div>

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
