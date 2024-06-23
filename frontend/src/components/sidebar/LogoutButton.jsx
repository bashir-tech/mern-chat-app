/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
	const { loading, logout } = useLogout();
	const { authUser, setAuthUser } = useAuthContext();
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState(null);
  
	const handleProfilePicChange = async (event) => {
	  const file = event.target.files[0];
	  if (file) {
		setUploading(true);
		try {
		  const formData = new FormData();
		  formData.append('profilePicture', file);
  
		  const response = await fetch('http://localhost:5000/api/users/updateProfile', {
			method: 'PATCH',
			body: formData,
			headers: {
			  'Authorization': `Bearer ${authUser.token}`, // Include auth token if required
			  'Accept': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			},
			credentials: 'include' // Send cookies with the request
		  });
  
		  if (!response.ok) {
			throw new Error('Failed to update profile picture');
		  }
  
		  const data = await response.json();
		  setImage(data.user.profilePic); // Ensure this matches the backend response
		  console.log("Profile updated", data.user.profilePic);
		} catch (error) {
		  console.error('Error updating profile picture:', error);
		} finally {
		  setUploading(false);
		}
	  }
	};
  
	return (
	  <div className='mt-auto flex justify-between'>
		{!loading ? (
		  <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		) : (
		  <span className='loading loading-spinner'></span>
		)}
		<div className="flex flex-col">
		  <label htmlFor="profile-pic-input">
			{uploading ? (
			  <span className='loading loading-spinner'></span>
			) : (
			  <img
				src={image ? `http://localhost:5000${image}` : '/path/to/default/profile-pic.png'}
				alt="Profile"
				className="w-6 h-6 cursor-pointer"
			  />
			)}
		  </label>
		  <input
			id="profile-pic-input"
			type="file"
			accept="image/*"
			className="hidden"
			onChange={handleProfilePicChange}
		  />
		</div>
	  </div>
	);
  };
  
  export default LogoutButton;
  