import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper, Grid, Container } from "@mui/material";

import { red } from "@mui/material/colors";

const displayYesNo = (value) => (value ? "Yes" : "No");

export default function UserCard(prop) {
	const {
		firstName,
		lastName,
		email,
		address,
		city,
		country,
		age,
		gender,
		ed_level,
		ed_specs,
		honesty,
		emotional,
		extraversion,
		agreeableness,
		consc,
		openness,
	} = prop;

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						{/* {firstName[0]} */}
					</Avatar>
				}
				// title={`${firstName} ${lastName}`}
			/>
			<CardContent>
				<Container>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center">
						<Grid item xs={12} sm container>
							<Grid item xs container direction="column" spacing={2}>
								<Grid item>
									<Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">{`Email: ${email}`}</Typography>
									<Typography variant="subtitle1">{`Address: ${address}, ${city}, ${country}`}</Typography>
									<Typography variant="subtitle1">{`Age: ${age}`}</Typography>
									<Typography variant="subtitle1">{`Gender: ${gender}`}</Typography>
									<Typography variant="subtitle1">{`Education Level: ${ed_level}`}</Typography>
									<Typography variant="subtitle1">{`Education Specs: ${ed_specs}`}</Typography>
								</Grid>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1">{`Honesty: ${displayYesNo(
									honesty
								)}`}</Typography>
								<Typography variant="subtitle1">{`Emotional: ${displayYesNo(
									emotional
								)}`}</Typography>
								<Typography variant="subtitle1">{`Extraversion: ${displayYesNo(
									extraversion
								)}`}</Typography>
								<Typography variant="subtitle1">{`Agreeableness: ${displayYesNo(
									agreeableness
								)}`}</Typography>
								<Typography variant="subtitle1">{`Conscientiousness: ${displayYesNo(
									consc
								)}`}</Typography>
								<Typography variant="subtitle1">{`Openness: ${displayYesNo(
									openness
								)}`}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</CardContent>
			{/* <CardActions disableSpacing>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</CardActions> */}
		</Card>
	);
}
