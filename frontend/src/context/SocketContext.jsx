import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [onlineVisitors, setOnlineVisitors] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("hhttps://chat-app-zxxt.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			socket.on("getOnlineVisitors", (visitors) => {
				setOnlineVisitors(visitors);
			});

			return () => socket.close();
		} else {
			const visitorId = `visitor_${Math.random().toString(36).substring(2, 15)}`;
			const socket = io("https://chat-app-zxxt.onrender.com", {
				query: {
					visitorId,
				},
			});

			setSocket(socket);

			socket.on("getOnlineVisitors", (visitors) => {
				setOnlineVisitors(visitors);
			});

			console.log("onlıne users:", onlineUsers)
			console.log("onlıne users:",onlineUsers)


			return () => socket.close();
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers, onlineVisitors }}>
			{children}
		</SocketContext.Provider>
	);
};
