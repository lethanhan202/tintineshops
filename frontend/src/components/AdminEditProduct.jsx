import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImg, setOpenFullScreenImg] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloud = await uploadImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloud.url]
            }
        })
    }

    const handleDeleteProductImg = async (index) => {
        const newProductImg = [...data.productImage]
        newProductImg.splice(index, 1)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImg]
            }
        })
    }

    {/**upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        } else if (responseData.error) {
            toast.error(responseData?.message)
        }
    }

    return (
        <div className='fixed w-full h-full flex justify-center items-center
        top-0 bottom-0 left-0 right-0 bg-opacity-35 bg-slate-200'>
            <div className='bg-white p-4 overflow-hidden rounded w-full h-full max-w-2xl max-h-[80%]'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl cursor-pointer
                     hover:text-red-600'
                        onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>

                <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
                    onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name: </label>
                    <input type="text" id='productName' name='productName' placeholder='Product Name'
                        value={data.productName} onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded' required />

                    <label htmlFor="brandName" className='mt-3'>Brand Name: </label>
                    <input type="text" id='brandName' name='brandName' placeholder='Brand Name'
                        value={data.brandName} onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded' required />


                    <label htmlFor="category" className='mt-3'>Category: </label>
                    <select value={data.category} name='category' onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded' required>
                        <option value={""}>Select category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>
                                        {el.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className='mt-3'>Product Image: </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-200 border rounded h-32 w-full flex
                        justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center 
                            items-center flex-col gap-2'>
                                <span className='text-4xl'><FaUpload /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type="file" id='uploadImageInput'
                                    className='hidden' onChange={handleUploadImage} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-3'>
                                    {data.productImage.map((el, index) => {
                                        return (
                                            <div className='relative group'>
                                                <img src={el} width={80} height={80}
                                                    className='border bg-slate-100 cursor-pointer'
                                                    onClick={() => {
                                                        setOpenFullScreenImg(true)
                                                        setFullScreenImage(el)
                                                    }} />
                                                <div className='absolute bottom-0 right-0 p-1 text-white
                                                 bg-red-600 cursor-pointer rounded-full group-hover:block hidden'
                                                    onClick={() => handleDeleteProductImg(index)}>
                                                    <MdDelete />
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>


                    <label htmlFor="price" className='mt-3'>Price: </label>
                    <input type="number" id='price' name='price' placeholder='Price'
                        value={data.price} onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded' required />


                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price: </label>
                    <input type="number" id='sellingPrice' name='sellingPrice' placeholder='Selling Price'
                        value={data.sellingPrice} onChange={handleOnChange}
                        className='bg-slate-100 p-2 border rounded' required />

                    <label htmlFor="description" className='mt-3'>Description: </label>
                    <textarea name="description" className='bg-slate-100 h-28 border resize-none'
                        placeholder='Product description' onChange={handleOnChange} required value={data.description}>
                    </textarea>


                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>
                        Update Product
                    </button>
                </form>


            </div>

            {/**display image full screen */}
            {
                openFullScreenImg && (
                    <DisplayImage onClose={() => setOpenFullScreenImg(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default AdminEditProduct