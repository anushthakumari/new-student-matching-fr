import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Find from "./pages/Find";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Find />,
	},
	{
		path: "/settings",
		element: <Settings />,
	},
	{
		path: "/find",
		element: <Find />,
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
