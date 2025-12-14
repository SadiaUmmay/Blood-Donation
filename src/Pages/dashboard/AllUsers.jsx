import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])


    useEffect(() => {

        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })

    }, [axiosSecure])
    console.log(users)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>User Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            users?.map(user =>
                            (
                                <tr key={user._id}>
                                    {/* Checkbox */}
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>

                                    {/* Avatar and Name */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.mainPhotoUrl || "https://i.ibb.co/7k5T1Bb/default.jpg"}
                                                        alt="User Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name || "Unknown Name"}</div>
                                                <div className="text-sm opacity-50">{user?.email || "No Email"}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td>
                                        <span className="badge badge-ghost badge-sm">
                                            {user?.role || "No Role"}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td>
                                        <span className={`badge badge-${user?.status === "active" ? "success" : "error"} badge-sm`}>
                                            {user?.status || "Unknown"}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <th>
                                        <button className="btn btn-ghost btn-xs">Details</button>
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;