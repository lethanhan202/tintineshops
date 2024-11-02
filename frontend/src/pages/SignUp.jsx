import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {

        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            } else if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } else {
            toast.error("Please, check password and confirm password")
        }


    }

    return (
        <section id="signup">
            <div className='container mx-auto p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcon} />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs opacity-85 bg-slate-200 py-4 text-center 
                                absolute bottom-0 w-full pt-2 pb-4'>
                                    Upload Photo
                                </div>
                                <input type="file" className='hidden' onChange={handleUploadPic} />
                            </label>

                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                        <div className='grid'>
                            <label>Name </label>
                            <div className='bg-slate-100 p-2'>
                                <input type='text' placeholder='Enter your name'
                                    className='w-full h-full outline-none bg-transparent'
                                    name="name"
                                    required
                                    value={data.name}
                                    onChange={handleOnChange} />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email </label>
                            <div className='bg-slate-100 p-2'>
                                <input type='email' placeholder='Enter your email'
                                    className='w-full h-full outline-none bg-transparent'
                                    name="email"
                                    required
                                    value={data.email}
                                    onChange={handleOnChange} />
                            </div>
                        </div>

                        <div>
                            <label>Password </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    onChange={handleOnChange}
                                    value={data.password}
                                    name='password'
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer'
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label>Confirm password </label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input type={showConfirmPassword ? "text" : "password"}
                                        placeholder='Enter confirm password'
                                        onChange={handleOnChange}
                                        value={data.confirmPassword}
                                        name='confirmPassword'
                                        required
                                        className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer'
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                        <span>
                                            {
                                                showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='bg-red-600 text-white px-6 
                        py-2 rounded-full max-w-[150px] w-full hover:scale-110 transition-all
                        mx-auto block mt-6'>
                            Sign Up
                        </button>

                        <p className='my-5'>Already have account? <Link to={'/login'}
                            className='hover:underline hover:text-red-500'>
                            Login here
                        </Link>
                        </p>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default SignUp