import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryProduct from '../helpers/fetchCategoryProduct'
import displayCurrency from '../helpers/dsiplayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';

const HorizontalCardproduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fecthData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fecthData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-bold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all'
                ref={scrollElement}>
                <button className='bg-white rounded-full shadow-md p-1 absolute 
                left-0 hidden md:block text-lg' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className='bg-white rounded-full shadow-md p-1 absolute 
                right-0 hidden md:block text-lg' onClick={scrollRight}>
                    <FaAngleRight />
                </button>
                {loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) :
                    (data.map((product, index) => {
                        return (
                            <Link to={"product/" + product?._id} className='w-full mix-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] 
                        h-36 rounded-sm shadow bg-white flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product?.productImage[0]}
                                        className="object-scale-down h-full transition-all hover:scale-110" />
                                </div>

                                <div className='p-4 grid'>
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

export default HorizontalCardproduct