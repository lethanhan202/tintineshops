import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import SummaryApi from '../common'
import { FaRegStar } from "react-icons/fa";
import displayCurrency from '../helpers/dsiplayCurrency';
import CategoryProductDisplay from '../components/CategoryProductDisplay';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const ProductDetails = () => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const productImg = new Array(4).fill(null)
    const [activeImg, setActiveImg] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)
    const navigate = useNavigate()
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate("/cart")
    }

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setData(dataResponse?.data)
        setActiveImg(dataResponse?.data?.productImage[0])
    }

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    {/**change image when hover into image */ }
    const handleMouseProduct = (imgUrl) => {
        setActiveImg(imgUrl)
    }

    {/**zoom image */ }
    const handleZoomImg = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveZoom = () => {
        setZoomImage(false)
    }


    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/**product image */}
                <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">

                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                        <img src={activeImg} className="h-full w-full object-scale-down mix-blend-multiply"
                            onMouseMove={handleZoomImg} onMouseLeave={handleLeaveZoom} />

                        {/**product zoom */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px]
                                 bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                        style={{
                                            background: `url(${activeImg})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                        }}
                                    >
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
                                    {
                                        productImg.map((el, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
                                    {
                                        data?.productImage?.map((image, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 p-1 rounded' key={image}>
                                                    <img src={image} onMouseEnter={() => handleMouseProduct(image)}
                                                        onClick={() => handleMouseProduct(image)}
                                                        className="h-full w-full cursor-pointer object-scale-down mix-blend-multiply" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/**product details */}
                {
                    loading ? (
                        <div className='grid gap-1 w-full'>
                            <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                            <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                                <p className='text-red-600 bg-slate-200 w-full'></p>
                                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                            </div>

                            <div className='w-full'>
                                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                                <p className='bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>

                            <p className='bg-red-200 text-red-600 rounded-full px-2 w-fit inline-block'>{data?.brandName}</p>

                            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>

                            <p className='capitalize text-slate-400'>{data?.category}</p>

                            <div className='flex items-center text-red-600 gap-1'>
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-red-600'>{displayCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayCurrency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] 
                            text-red-600 font-medium hover:text-white hover:bg-red-600'
                                    onClick={(e) => handleBuyProduct(e, data?._id)}>
                                    Buy
                                </button>
                                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] 
                            bg-red-600 font-medium text-white hover:bg-white hover:text-red-600'
                                    onClick={(e) => handleAddToCart(e, data?._id)}>
                                    Add to Cart
                                </button>
                            </div>

                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description:</p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }

            </div>

            {
                data?.category &&
                <CategoryProductDisplay category={data?.category} heading={"Recomment Product"} />
            }

        </div>
    )
}

export default ProductDetails