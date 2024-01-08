import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import API from "./../../api-endpoint.js";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(data.confirmPassword !== data.password) {
			setError('password & confirm password is not marching');
		} else {
			try {
				const url = API.SIGNUP;
				const { data: res } = await axios.post(url, {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: data.password,
				});
				navigate("/login");
				console.log(res.message);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.submit_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
