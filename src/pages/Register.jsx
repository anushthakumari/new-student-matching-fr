import * as React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { fetch_user_by_email, insert_user } from "../schemas/users.schema";
import { set_user, get_user } from "../utils/login.utils";

export default function Register() {
	const [isLoading, setisLoading] = React.useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		setisLoading(true);

		const data = new FormData(event.currentTarget);
		const d = {
			email: data.get("email").trim(),
			password: data.get("password").trim(),
			firstName: data.get("firstName").trim(),
			lastName: data.get("lastName").trim(),
		};

		try {
			const user = await fetch_user_by_email(d.email);

			if (user) {
				alert("User with this email already exists!");
				setisLoading(false);
				return;
			}

			const user_id = await insert_user(
				d.email,
				d.password,
				d.firstName,
				d.lastName
			);

			set_user({ ...d, id: user_id });
			navigate("/");
			alert("You've been registerd!");
		} catch (error) {
			// Handle error
			alert("something went wrong!");
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	React.useEffect(() => {
		const logged_data = get_user();
		if (logged_data) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={isLoading}>
						{isLoading ? "Loading..." : "Sign Up"}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
