import * as React from "react";
import { Navigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { MainListItems } from "./listItems";
import { get_user } from "../utils/login.utils";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

export default function DashLayout({ children }) {
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const logged_data = get_user();
	if (!logged_data) {
		return <Navigate to="/login" />;
	}

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer variant="permanent" open={open} elevation={0}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">
					<MainListItems />
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: "white",
					flexGrow: 1,
					height: "100vh",
					overflow: "auto",
				}}>
				<Toolbar />
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					{children}
				</Container>
			</Box>
		</Box>
	);
}
