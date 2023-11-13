import * as React from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { fetch_user_by_email } from "../schemas/users.schema";
import { get_user, set_user } from "../utils/login.utils";

export default function Login() {
	const [isLoading, setisLoading] = React.useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		setisLoading(true);

		const data = new FormData(event.currentTarget);
		const d = {
			email: data.get("email"),
			password: data.get("password"),
		};

		try {
			const user = await fetch_user_by_email(d.email);

			if (!user) {
				alert("User with this email doesn't exists!");
				setisLoading(false);
				return;
			}

			if (user.pass !== d.password) {
				alert("Invalid Password!");
				setisLoading(false);
				return;
			}

			set_user({ ...user, pass: null, user_id: user.doc_id });
			navigate("/");
		} catch (error) {
			console.log("something went wrong!");
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
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isLoading}>
						{isLoading ? "Loading..." : "Sign In"}
					</Button>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<Link href="/register" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
