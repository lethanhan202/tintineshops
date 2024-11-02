import React, { useState } from 'react'
import ROLE from '../common/role.js'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, onClose, userId, callFunc }) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchRes = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const resData = await fetchRes.json()

        if (resData.success) {
            toast.success(resData.message)
            onClose()
            callFunc()
        }
        console.log("role updated", resData);
    }

    return (
        <div className='fixed top-0 right-0 left-0 bottom-0 flex 
        justify-between items-center w-full h-full z-10 bg-slate-200 bg-opacity-50'>
            <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex justify-between items-center my-3'>
                    <p>Role: </p>
                    <select className='px-4 border py-1' value={userRole}
                        onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='block mx-auto w-fit py-1 px-3 rounded-full
                text-white bg-red-500 hover:bg-red-700 my-4'
                    onClick={updateUserRole}>
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole