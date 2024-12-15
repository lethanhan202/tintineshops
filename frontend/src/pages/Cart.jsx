import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/dsiplayCurrency'
import { FaTrash } from "react-icons/fa6";
import { loadStripe } from '@stripe/stripe-js'


const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartView.url, {
            method: SummaryApi.addToCartView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }

    }

    const handleLoading = async () => {
        fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCart.url, {
            method: SummaryApi.updateCart.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCart.url, {
                method: SummaryApi.updateCart.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCart.url, {
            method: SummaryApi.deleteCart.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((preValue, currentValue) => preValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preValue, currentValue) => preValue + (currentValue?.productId?.sellingPrice * currentValue.quantity), 0)

    const handleStripePayment = async () => {
        const stripePromise = await
            loadStripe('pk_test_51NF4jXE7MDcwEPLX1utqKtvM3e3zNtItDQWFO8iaRrVL4HEjYahwgBBm08pCQkUV24N4C3f5MwY1lsBQTy8PwULr003XovdfMs')

        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ cartItem: data })
        })

        const dataResponse = await response.json()

        if (dataResponse?.id) {
            stripePromise.redirectToCheckout({ sessionId: dataResponse.id })
        }
    }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                {/**view product */}
                <div className='w-full max-w-3xl p-4'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (
                                    <div key={index + "Loadings"} className='w-full my-2 bg-slate-200 h-32 border
                                     border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + index} className='w-full my-2 bg-white h-32 border
                                     border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        {/**product image */}
                                        <div className="w-[125px] h-[125px] bg-slate-300">
                                            <img src={product?.productId?.productImage[0]}
                                                className="w-full h-full mix-blend-multiply object-scale-down" />
                                        </div>

                                        <div className='px-4 py-2 relative'>
                                            {/**delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full 
                                            p-2 hover:text-white hover:bg-red-600 cursor-pointer'
                                                onClick={() => deleteCartProduct(product?._id)}>
                                                <FaTrash />
                                            </div>

                                            {/**product name */}
                                            <h2 className='text-xl lg:text-xl text-ellipsis line-clamp-1'>
                                                {product?.productId?.productName}
                                            </h2>

                                            {/**category */}
                                            <p className='capitalize'>
                                                {product?.productId?.category}
                                            </p>

                                            {/**price */}
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>
                                                    {displayCurrency(product?.productId?.sellingPrice)}
                                                </p>
                                                <p className='text-slate-500 font-semibold text-lg'>
                                                    {displayCurrency(product?.productId?.sellingPrice * product?.quantity)}
                                                </p>
                                            </div>

                                            {/**update quantity */}
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='flex items-center rounded justify-center h-6 border
                                                 border-red-600 text-red-600 w-6 hover:text-white hover:bg-red-600'
                                                    onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                                    -
                                                </button>
                                                <span>{product?.quantity}</span>
                                                <button className='flex items-center rounded justify-center h-6 border
                                                 border-red-600 text-red-600 w-6 hover:text-white hover:bg-red-600'
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/**Total product */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                            {
                                loading ? (
                                    <div className='h-36 animate-pulse bg-slate-200 border-slate-300 border'>
                                    </div>
                                ) : (
                                    <div className='h-36 bg-white'>
                                        <h2 className='text-white bg-red-600 px-4 py-1'>
                                            Summary
                                        </h2>

                                        {/**total quantity product */}
                                        <div className='flex items-center justify-between px-4 gap-2
                                font-medium text-lg text-slate-600'>
                                            <p>Quantity: </p>
                                            <p>{totalQty}</p>
                                        </div>

                                        {/**total price */}
                                        <div className='flex items-center justify-between px-4 gap-2
                                font-medium text-lg text-slate-600'>
                                            <p>Total Price: </p>
                                            <p>{displayCurrency(totalPrice)}</p>
                                        </div>

                                        {/**payment */}
                                        <div>
                                            <button className='bg-blue-600 text-white w-full p-2'
                                                onClick={() => handleStripePayment()}>
                                                Payment
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart
