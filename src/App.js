import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import Find from "./pages/Find";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/find",
		element: <Find />,
	},
	{
		path: "/profile/:id",
		element: <Profile />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
