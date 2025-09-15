import React, { useState } from 'react';
import { toast } from 'react-toastify';
import userAPI from '../../api/userAPI';

const BasicInfo = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    const res = await userAPI.editProfileAPI(username);
    if (res.ok) {
      setIsEditing(false);
      toast.success(res.message);
      if (res.payload?.username) {
        setUsername(res.payload.username);
      }
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto bg-white p-4 rounded-md shadow-md'>
      <p className='text-2xl font-semibold text-gray-700 text-center mb-4'>Personal information</p>
      <form onSubmit={handleSaveInfo}>
        <div className='flex flex-col items-start md:flex-row md:items-center gap-2 mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!isEditing ? 'cursor-not-allowed' : ''}`}
          />
        </div>

        <div key={isEditing ? 'edit' : 'view'}>
          {isEditing ? (
            <>
              <button
                type='submit'
                className='px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition mr-2'
              >Save</button>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition'
              >Cancel</button>
            </>
          ) : (
            <button
              type='button'
              onClick={() => setIsEditing(true)}
              className='px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500 transition'
            >Edit</button>
          )}
        </div>


      </form>
    </div>
  )
}

export default BasicInfo