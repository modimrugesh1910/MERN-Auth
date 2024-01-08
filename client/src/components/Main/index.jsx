import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import API from "./../../api-endpoint.js";

const Main = () => {
	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
	};

	const [data, setData] = useState({ 
		age: "", 
		dob: "",
		mobile: ""
	});
	const [selectedGender, setGender] = useState();
	const [error, setError] = useState("");

	const loggedInUser = JSON.parse(localStorage.getItem('user'));

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const selectHandleChange = (event) => {
		setGender(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = API.USER;
			const userData = {...data, gender: selectedGender, email: loggedInUser.email}
			const { data: res } = await axios.post(url, userData);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Welcome {loggedInUser.firstName}</h1>
				<button className={styles.logout_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<div className={styles.personal_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Profile Details</h1>
						<input
							type="number"
							placeholder="Age"
							name="age"
							onChange={handleChange}
							value={data.age}
							required
							className={styles.input}
						/>
						<select onChange={selectHandleChange}
							name="gender"
							value={selectedGender}
							required
							className={styles.select}>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						<input
							type="date"
							placeholder="Date of Birth"
							name="dob"
							onChange={handleChange}
							value={data.dob}
							required
							className={styles.input}
						/>
						<input
							type="string"
							placeholder="Mobile"
							name="mobile"
							minLength={10}
							maxLength={10}
							onChange={handleChange}
							value={data.mobile}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.submit_btn}>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Main;
