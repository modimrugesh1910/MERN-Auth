const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const ENV = require('./../environments/dev.env');

router.post("/signup", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(401).send({ message: "User exists" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();

		// const token = user.generateAuthToken();
		res.status(200).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { error } = validateLogin(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, user: {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			age: user.age ? user.age : "",
			dob: user.dob ? user.dob : "",
			gender: user.gender ? user.gender : "",
			mobile: user.mobile ? user.mobile : "",
		}, message: "logged in successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
