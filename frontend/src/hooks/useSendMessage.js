import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useCsrfToken from "./useCsrfToken";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const csrfToken = useCsrfToken();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			if (!csrfToken) {
				throw new Error("CSRF token is not available");
			}

			const res = await fetch(`/api/messages/send/${ selectedConversation._id }`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": csrfToken, // Include CSRF token in headers
				},
				body: JSON.stringify({ message }),
			});

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
