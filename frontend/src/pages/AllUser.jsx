import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { FaTrash } from "react-icons/fa6";

const AllUser = () => {

    const [allUser, setAllUser] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetail, setUpdateUserDetail] = useState({
        name: "",
        email: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataRes = await fetchData.json()

        if (dataRes.success) {
            setAllUser(dataRes.data)
        }
        if (dataRes.error) {
            toast.error(dataRes.message)
        }

        //console.log(dataRes);
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchDeleteUser = async (id) => {
        const res = await fetch(SummaryApi.adminDeleteUser.url, {
            method: SummaryApi.adminDeleteUser.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            }),
            credentials: 'include'
        })

        const resData = await res.json()

        if (resData.success) {
            fetchAllUsers()
            toast.success(resData.message)

        }
        if (resData.error) {
            toast.error(resData.message)
        }
    }


    return (
        <div className='pb-4 bg-white'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className=''>
                    {
                        allUser.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-100 hover:bg-green-500 hover:text-white 
                                        p-2 rounded-full cursor-pointer'
                                            onClick={() => {
                                                setUpdateUserDetail(el)
                                                setOpenUpdateRole(true)
                                            }}>
                                            <MdModeEdit />
                                        </button>
                                        <button className='bg-red-300 hover:bg-red-500 hover:text-white 
                                        p-2 rounded-full cursor-pointer'
                                            onClick={() => {
                                                fetchDeleteUser(el?._id)
                                            }}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetail.name}
                        email={updateUserDetail.email}
                        role={updateUserDetail.role}
                        userId={updateUserDetail._id}
                        callFunc={fetchAllUsers} />)
            }

        </div>
    )
}

export default AllUser