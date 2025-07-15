import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import { Helmet } from 'react-helmet';
import { getToken } from '../../Context/AuthProvider';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading} = use(AuthContext)

    // const token = getToken()

    // const [users,setUsers] = useState([])

    // console.log(users)


    //  useEffect(() =>{
    //        fetch("http://localhost:4000/users" )
    //       .then(res=> res.json())
    //       .then(data =>setUsers(data)  )
            
    //  },[axiosSecure])
     
    

    const {data: users = [],isLoading,refetch} = useQuery({
        queryKey:[ user?.email , "all-user" ],
        enabled: !!user?.email && !loading && !!user?.accessToken ,
        queryFn:  async () =>{
            const res = await axiosSecure.get("/users")
            return res.data;
        },
        
    })



    const handleStatusUpdate =async (id,status)=>{

       const response =  await axiosSecure.patch(`/users/${id}/role`,{
        role: status, 
       })
       refetch()
       if (response.data.modifiedCount > 0) {
               Swal.fire('✅ Success', 'User status updated!', 'success');
               
             }else {
             Swal.fire('❌ Error', 'Failed to promote user', 'error');
             }

    }


//    {isLoading && <Loading></Loading>}



    return (
        <div className="max-w-7xl mt-10 px-4 text-white">
                                            <Helmet>
                                                 <title> Dashboard| Moderator</title>
                                            </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>
      <div className="overflow-x-auto rounded-lg bg-white/10 backdrop-blur-md shadow-md border border-white/20">
        <table className="table  w-full text-white bg-white/20">
          <thead>
            <tr className="text-left text-white bg-white/20">
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
          
            </tr>
          </thead>
          <tbody>
            {users.map((userData, index) => (
              <tr key={userData._id} className="hover:bg-white/5">
                <td>{index + 1}</td>
                <td>{userData.userName}</td>
                <td >{userData.email}</td>
                <td className='capitalize'>{userData.role}</td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(userData._id,"moderator")}
                    className="btn btn-sm btn-warning "
                    disabled={userData.role === 'moderator'}
                  >
                    Moderator
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(userData._id, 'admin')}
                    className="btn btn-sm btn-success"
                    disabled={userData.role === 'admin'}
                  >
                    Admin
                  </button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageUser;