import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {

    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        setAllProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div>
            <div className='bg-white p-2 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button className='border-2 border-red-600 py-1 px-3 rounded-full
                text-red-600 hover:bg-red-500 hover:text-white transition-all'
                    onClick={() => setOpenUploadProduct(true)}>
                    Upload Product
                </button>
            </div>

            {/**all product */}
            <div className='flex items-center gap-4 py-4'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} />
                        )
                    })
                }
            </div>

            {/*upload product component*/}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} />
                )
            }

        </div>
    )
}

export default AllProduct