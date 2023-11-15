import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DashLayout from "../layouts/DashLayout";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

import { findOptimalMatches } from "../utils/findMatch";
import { get_user } from "../utils/login.utils";
import { fetch_all_users_details } from "../schemas/users.schema";

const data = new Array(8).fill(0).map((v, i) => i);

const Find = () => {
	const [isLoading, setisLoading] = useState(false);
	const [match, setmatch] = useState(null);

	useEffect(() => {
		const fetchusers = async () => {
			setisLoading(true);

			try {
				const { id } = get_user();
				const data = await fetch_all_users_details();
				// console.log(data);
				// console.log(id);
				const d = findOptimalMatches(data, id);
				setmatch(d);
				console.log(d);
			} catch (error) {
				console.log(error);
			} finally {
				setisLoading(false);
			}
		};

		fetchusers();
	}, []);

	return (
		<DashLayout>
			<Typography variant="h6" mb={4}>
				Here are the best match for you, based on the preference settings.
			</Typography>

			{match?.doc_id ? <UserCard {...match} /> : null}

			{/* <Grid gap={2} container>
				

				{data.map((v) => (
					<Grid sm={3} key={v} item></Grid>
				))}
			</Grid> */}
			<Loader open={isLoading} />
		</DashLayout>
	);
};

export default Find;
