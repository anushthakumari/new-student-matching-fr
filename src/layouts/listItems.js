import * as React from "react";
import { useNavigate } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

import { remove_user } from "../utils/login.utils";

export const MainListItems = () => {
	const navigate = useNavigate();

	const logout = () => {
		remove_user();
		navigate("/login");
	};

	return (
		<React.Fragment>
			<ListItemButton onClick={() => navigate("/find")}>
				<ListItemIcon>
					<SearchIcon />
				</ListItemIcon>
				<ListItemText primary="Find" />
			</ListItemButton>
			<ListItemButton onClick={() => navigate("/settings")}>
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
				<ListItemText primary="Settings" />
			</ListItemButton>
			<ListItemButton onClick={logout}>
				<ListItemText primary="Logout" />
			</ListItemButton>
		</React.Fragment>
	);
};
