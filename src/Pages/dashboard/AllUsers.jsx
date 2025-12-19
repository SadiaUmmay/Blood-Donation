import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([])
    const fetchUsers = () => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }

    useEffect(() => {

        fetchUsers();

    }, [axiosSecure])

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                console.log(res.data);
                fetchUsers();
            })
    }

    const makeVolunteer = (email) => {
        axiosSecure
          .patch(`/users/make-volunteer/${email}`)
          .then(() => fetchUsers());
      };

    const makeAdmin = (email)=>{
        axiosSecure
        .patch(`/users/make-admin/${email}`)
        .then(()=> fetchUsers());
    }
      
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
                                        {
                                            user?.status == 'active' ? (<button
                                                onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-ghost btn-xs">Blocked</button>)
                                                : (
                                                    <button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-ghost btn-xs">Active</button>
                                                )
                                        }
                                    </th>
                                    <th>
                                    {user.role === 'donor' && (
                                        <button
                                            onClick={() => makeVolunteer(user.email)}
                                            className="btn btn-xs btn-info"
                                        >
                                            Make Volunteer
                                        </button>
                                    )}
                                    </th>
                                    <th>
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => makeAdmin(user.email)}
                                            className="btn btn-xs btn-info"
                                        >
                                            Make Admin
                                        </button>
                                    )}
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