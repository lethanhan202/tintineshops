import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location?.search)
    const urlCategoryList = urlSearch.getAll("category")

    const urlCategoryObject = {}
    urlCategoryList.forEach(el => {
        urlCategoryObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryObject)
    const [filterCategory, setFilterCategory] = useState([])
    const [sortBy, setSortBy] = useState("")


    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategory
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((pre) => {
            return {
                ...pre,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategory])

    useEffect(() => {
        const arrayCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategory(arrayCategory)

        //format for url change on checkbox
        const urlFormat = arrayCategory.map((el, index) => {
            if ((arrayCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })
        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    const handleSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)
        if (value === 'asc') {
            setData(prev => prev.sort((a, b) => a?.sellingPrice - b?.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => prev.sort((a, b) => b?.sellingPrice - a?.sellingPrice))
        }
    }

    useEffect(() => {

    }, [sortBy])

    return (
        <div className='container mx-auto p-4'>
            {/**desktop screen */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/**left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

                    {/**sort by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 
                        border-b border-slate-300 pb-1'>
                            Sort By
                        </h3>

                        <form className="text-sm flex flex-col gap-2 py-2">
                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' value={"asc"}
                                    onChange={handleSortBy} checked={sortBy === 'asc'} />
                                <label htmlFor="">Price - Low to High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' value={"dsc"}
                                    onChange={handleSortBy} checked={sortBy === 'dsc'} />
                                <label htmlFor="">Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/**filter by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 
                        border-b border-slate-300 pb-1'>
                            Category
                        </h3>

                        <form className="text-sm flex flex-col gap-2 py-2">
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className='flex items-center gap-3'>
                                            <input type="checkbox" name={'category'} id={categoryName?.value}
                                                onChange={handleSelectCategory} value={categoryName?.value}
                                                checked={selectCategory[categoryName?.value]} />
                                            <label htmlFor={categoryName.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>

                {/**right side */}
                <div className='px-4'>
                    <p className='font-medium text-slate-600 text-lg my-2'>Search Result: {data.length}</p>

                    <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
                        {
                            data.length !== 0 && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CategoryProduct