import React, { useEffect, useState } from 'react'
import fetchCategoryProduct from '../helpers/fetchCategoryProduct'
import displayCurrency from '../helpers/dsiplayCurrency'
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const CategoryProductDisplay = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)


    const fecthData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fecthData()
    }, [])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-bold py-4'>{heading}</h2>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] md:gap-6 overflow-x-scroll 
            scrollbar-none transition-all justify-between'>
                {loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) :
                    (data.map((product, index) => {
                        return (
                            <Link to={"product/" + product?._id} className='w-full mix-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] 
                             rounded-sm shadow bg-white'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                    <img src={product?.productImage[0]}
                                        className="object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply" />
                                </div>

                                <div className='p-4 grid gap-3'>
                                    <h2 className='text-base text-black md:text-lg font-medium text-ellipsis line-clamp-1'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>
                                        {product?.category}
                                    </p>
                                    <div className='flex gap-3'>
                                        <p className='font-medium text-red-600'>
                                            {displayCurrency(product?.sellingPrice)}
                                        </p>
                                        <p className='text-slate-500 line-through'>
                                            {displayCurrency(product?.price)}
                                        </p>
                                    </div>
                                    <button onClick={(e) => addToCart(e, product?._id)}
                                        className='text-sm bg-red-600 hover:bg-red-700 text-white 
                                    px-3 py-0.5 rounded-full'>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        )
                    }))
                }
            </div>


        </div>
    )
}

export default CategoryProductDisplay