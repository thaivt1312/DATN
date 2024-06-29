import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/NavBar";
import SideBar from "./components/NotificationSideBar";

import Router from "./router";
import { requestForToken } from "./firebase";

function App() {
	const [hasPermission, setHasPermission] = useState(false)

	function requestPermission() {
		console.log('Requesting permission...');
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('Notification permission granted.');
				setHasPermission(true)
			}
		})
	}
	useEffect(() => {
		requestPermission()
		async function fetchToken() {
			let token = await requestForToken()
			localStorage.setItem('firebaseToken', token)
		}
		fetchToken()
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null')) {
			let date1 = JSON.parse(window.localStorage.getItem("data")).loginTime;
			let date2 = Date.now();
			let difference = date2 - date1;
			if (difference > 1000 * 60 * 60 * 24) {
				// window.localStorage.removeItem("data");
				window.localStorage.clear();
				window.location.reload();
			}
		}
	});


	return (
		<div style={{
			// width: '100vw',
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
		}}>
			{
				!hasPermission ?
					<span style={{ color: 'red' }}>Please allow notification permission</span>
					: <></>
			}
			<Navbar />
			<Stack direction={"row"} flex={1}>
				<div style={{
					width: '80vw',
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}>
					<Router />
				</div>

				<SideBar />

			</Stack>
			<ToastContainer />

		</div>
	)
}

export default App
