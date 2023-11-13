import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
	box: {
		padding: theme.spacing(2),
		border: "1px solid black",
		borderRadius: theme.shape.borderRadius,
	},
	underline: {
		textDecoration: "underline",
		display: "inline-block",
		marginBottom: theme.spacing(2),
	},
}));

const EducationalDetails = () => {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
			<Typography className={classes.underline} variant="h5">
				Educational Details
			</Typography>
			{/* Educational details content */}
		</Box>
	);
};

export default EducationalDetails;
