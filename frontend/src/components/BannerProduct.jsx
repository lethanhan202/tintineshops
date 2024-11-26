import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'
import imageMobile1 from '../assest/banner/img1_mobile.jpg'
import imageMobile2 from '../assest/banner/img2_mobile.webp'
import imageMobile3 from '../assest/banner/img3_mobile.jpg'
import imageMobile4 from '../assest/banner/img4_mobile.jpg'
import imageMobile5 from '../assest/banner/img5_mobile.png'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const desktopImg = [image1, image2, image3, image4, image5]
    const mobileImg = [imageMobile1, imageMobile2, imageMobile3, imageMobile4, imageMobile5]
    const [currentImg, setCurrentImg] = useState(0)

    const nextImg = () => {
        if (desktopImg.length - 1 > currentImg) {
            setCurrentImg(prev => prev + 1)
        }
    }

    const prevImg = () => {
        if (currentImg !== 0) {
            setCurrentImg(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImg.length - 1 > currentImg) {
                nextImg()
            } else {
                setCurrentImg(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImg])

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='md:h-72 h-56 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex hidden items-center'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button className='bg-white rounded-full shadow-md p-1'
                            onClick={prevImg}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-white rounded-full shadow-md p-1'
                            onClick={nextImg}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/** destop and tablet screen */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImg.map((img, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all'
                                    key={img} style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                                    <img src={img} className="w-full h-full" />
                                </div>
                            )
                        })
                    }
                </div>


                {/** mmobiles screen */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImg.map((img, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all'
                                    key={img} style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                                    <img src={img} className="w-full h-full object-fill" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct