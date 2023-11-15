import * as React from "react";
import { useNavigate } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

export const MainListItems = () => {
	const navigate = useNavigate();

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
		</React.Fragment>
	);
};
