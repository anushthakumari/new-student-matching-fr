import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { red } from "@mui/material/colors";

export default function UserCard() {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						R
					</Avatar>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					This impressive paella is a perfect party dish and a fun meal to cook
					together with your guests. Add 1 cup of frozen peas along with the
					mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</CardActions>
		</Card>
	);
}
