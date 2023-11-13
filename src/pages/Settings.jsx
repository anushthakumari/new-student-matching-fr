import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

import Loader from "../components/Loader";
import DashLayout from "../layouts/DashLayout";

import { fetch_user_by_email, insert_details } from "../schemas/users.schema";
import { get_user } from "../utils/login.utils";

import eduction_specialisation from "../data/eduction_specialisation";
import country_list from "../data/country_list";

const defaultState = {
	firstName: "",
	lastName: "",
	gender: "",
	age: "",
	height: "",
	address: "",
	city: "",
	state: "",
	country: "",
	zip: "",
	college_name: "",
	ed_level: "",
	ed_specs: "",
};

export default function Settings() {
	const { id, email } = get_user();

	const [isLoading, setisLoading] = useState(false);
	const [formState, setformState] = useState(defaultState);

	const handleChange = (e) => {
		setformState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handelSubmit = async (e) => {
		e.preventDefault();
		try {
			setisLoading(true);
			const d = {};
			for (const key in formState) {
				const val = formState[key];

				if (key === "created_at" || key === "last_updated") {
					continue;
				}

				if (val && val.trim()) {
					d[key] = val;
				} else {
					alert(key + " is required!!");
					setisLoading(false);
					return;
				}
			}

			await insert_details(d, id);

			alert("Saved Successfully!");
		} catch (error) {
			console.log(error);
			alert("Something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);
				const dt = await fetch_user_by_email(email);

				if (!dt) {
					setformState(defaultState);
				}

				const { last_updated, ...det } = dt;

				setformState(det);
			} catch (error) {
			} finally {
				setisLoading();
			}
		})();
	}, [id]);

	return (
		<DashLayout>
			<form onSubmit={handelSubmit}>
				<Loader open={isLoading} />
				<Typography variant="h6" gutterBottom>
					Your Details
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="firstName"
							name="firstName"
							value={formState.firstName}
							onChange={handleChange}
							label="First name"
							fullWidth
							autoComplete="given-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="lastName"
							name="lastName"
							value={formState.lastName}
							onChange={handleChange}
							label="Last name"
							fullWidth
							autoComplete="family-name"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel id="gender-label">Gender</InputLabel>
							<Select
								name="gender"
								value={formState.gender}
								onChange={handleChange}
								labelId="gender-label"
								id="gender"
								label="Gender">
								<MenuItem>Select Gender</MenuItem>
								<MenuItem value={"Male"}>Male</MenuItem>
								<MenuItem value={"Female"}>Female</MenuItem>
								{/* <MenuItem value={"rns"}>Rather Not Say</MenuItem> */}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							type="number"
							inputProps={{ max: 40 }}
							required
							id="age"
							name="age"
							value={formState.age}
							onChange={handleChange}
							label="Age"
							fullWidth
							autoComplete="age"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							type="number"
							value={formState.height}
							onChange={handleChange}
							inputProps={{ max: 10 }}
							required
							id="height"
							name="height"
							label="Height (Ft)"
							fullWidth
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							value={formState.address}
							onChange={handleChange}
							id="address1"
							name="address"
							label="Address line"
							fullWidth
							autoComplete="shipping address-line1"
							variant="standard"
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="city"
							name="city"
							value={formState.city}
							onChange={handleChange}
							label="City"
							fullWidth
							autoComplete="shipping address-level2"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="state"
							name="state"
							value={formState.state}
							onChange={handleChange}
							label="State/Province/Region"
							fullWidth
							variant="standard"
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="zip"
							name="zip"
							type="number"
							value={formState.zip}
							onChange={handleChange}
							label="Zip / Postal code"
							fullWidth
							autoComplete="shipping postal-code"
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel id="country-label">Country</InputLabel>
							<Select
								value={formState.country}
								onChange={handleChange}
								name="country"
								labelId="country-label"
								id="country"
								label="Education Level">
								{country_list.map((v, i) => (
									<MenuItem key={i} value={v}>
										{v}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Typography mt={"3rem"} variant="h6" gutterBottom>
					Education Details
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="collegename"
							name="college_name"
							value={formState.college_name}
							onChange={handleChange}
							label="College Name/University"
							fullWidth
							variant="standard"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel id="ed_level-label">Education Level</InputLabel>
							<Select
								value={formState.ed_level}
								onChange={handleChange}
								name="ed_level"
								labelId="ed_level-label"
								id="ed_level"
								label="Education Level">
								<MenuItem>Select Education Level</MenuItem>
								<MenuItem value={"Under Grad"}>Under Grad</MenuItem>
								<MenuItem value={"Post Grad"}>Post Grad</MenuItem>
								<MenuItem value={"Doctrate"}>Doctrate</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel id="specialisation-label">Specialisation</InputLabel>
							<Select
								value={formState.ed_specs}
								onChange={handleChange}
								name="ed_specs"
								labelId="specialisation-label"
								id="specialisation"
								label="Specialisation">
								<MenuItem>Select</MenuItem>
								{eduction_specialisation.map((v, i) => (
									<MenuItem key={i} value={v.value}>
										{v.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Typography mt={"3rem"} variant="h6" gutterBottom>
						Personality
					</Typography>

					<Grid container spacing={3}>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Honesty"
										secondary="The tendency to be fair, honest, and trustworthy, and to be modest and avoid arrogance."
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Emotionality"
										secondary="The tendency to experience and express emotions intensely, and to be anxious and prone to worry."
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Extraversion"
										secondary="The tendency to be outgoing, sociable, and assertive, and to enjoy the company of others."
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Agreeableness"
										secondary="The tendency to be cooperative, trusting, and forgiving, and to avoid conflict and competition."
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Conscientiousness"
										secondary="The tendency to be organized, hardworking, and responsible, and to plan ahead and avoid impulsiveness."
									/>
								</ListItem>
							</List>
						</Grid>
						<Grid sm={6} item>
							<List>
								<ListItem>
									<Checkbox />
									<ListItemText
										primary="Openness to Experience"
										secondary="The tendency to be curious, creative, and imaginative, and to enjoy new experiences and ideas."
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>

					<Grid item mt={"2rem"} sm={12}>
						<Button type="submit" variant="contained">
							Save
						</Button>
					</Grid>
				</Grid>
			</form>
		</DashLayout>
	);
}
