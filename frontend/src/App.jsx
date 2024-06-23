/* eslint-disable no-mixed-spaces-and-tabs */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChartsComponent from "./components/dashboard/ChartsComponent";
import { useAuthContext } from "./context/AuthContext";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

const queryClient = new QueryClient({
	defaultOptions: {
	  queries: {
		cacheTime: 1000 * 60 * 60 * 24, // 24 hours
	  },
	},
  });
function App() {
	const { authUser } = useAuthContext();
	return (
		<QueryClientProvider client={queryClient}>

		
		<div className='p-4 h-screen w-full flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				
				<Route path="/dashboard" element={ authUser ?
               
                  <DashboardPage />:<Navigate to={"/login"} />
               
					
              }>
                <Route index element={<ChartsComponent />} />
              </Route>

			</Routes>
			<Toaster />
			</div>
			</QueryClientProvider>
	);
}

export default App;
