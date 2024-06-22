import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	const { authUser } = useAuthContext();

	return (
		<div className='mt-auto flex justify-between'>
			<>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
				)}
				<div className="flex flex-col">
					<img src={authUser.profilePic} className="text-white w-6 h-6" />

				</div>
			</>
		

		</div>
	);
};
export default LogoutButton;
