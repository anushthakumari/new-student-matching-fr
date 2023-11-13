import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DashLayout from "../layouts/DashLayout";
import UserCard from "../components/UserCard";

const data = new Array(8).fill(0).map((v, i) => i);

const Find = () => {
	return (
		<DashLayout>
			<Typography variant="h4" mb={4}>
				Here are the best matches for you ;)
			</Typography>
			<Grid gap={2} container>
				{data.map((v) => (
					<Grid sm={3} key={v} item>
						<UserCard />
					</Grid>
				))}
			</Grid>
		</DashLayout>
	);
};

export default Find;
