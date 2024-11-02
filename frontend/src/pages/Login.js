import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import Context from '../context';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(Context)


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
        } else if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }

    return (
        <section id="login">
            <div className='container mx-auto p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email </label>
                            <div className='bg-slate-100 p-2'>
                                <input type='email' placeholder='Enter your email'
                                    className='w-full h-full outline-none bg-transparent'
                                    onChange={handleOnChange}
                                    name="email"
                                    value={data.email} />
                            </div>
                        </div>

                        <div>
                            <label>Password </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    onChange={handleOnChange}
                                    name='password'
                                    value={data.password}
                                    className='w-full h-full outline-none bg-transparent'
                                    required />
                                <div className='cursor-pointer'
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>

                            <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-500'>
                                Forgot password?
                            </Link>
                        </div>

                        <button className='bg-red-600 text-white px-6 
                        py-2 rounded-full max-w-[150px] w-full hover:scale-110 transition-all
                        mx-auto block mt-6'>
                            Login
                        </button>
                    </form>

                    <p className='my-5'>Don't have account? <Link to={'/signup'}
                        className='hover:underline hover:text-red-500'>
                        Create now
                    </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
