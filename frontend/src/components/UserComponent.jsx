import React, { useEffect, useState } from 'react'
import Users from '../components/Users';
import api from '../api';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.get('/user/bulk')
      .then(res => setUsers(res.data.user))
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='mx-10'>
      <h3 className='text-2xl font-bold mb-3'>Users</h3>
      <input 
        type="text" 
        placeholder="Search Users..." 
        className="mb-10 py-1 px-2 w-full border border-gray-400 rounded-md"
        onChange={handleSearch} 
      />
      {filteredUsers.map(user => (
        <Users key={user._id} user={user} />
      ))}
    </div> 
  )
}

export default UserComponent