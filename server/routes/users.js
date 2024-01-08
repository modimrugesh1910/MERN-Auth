const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({ email: req.body.email }, req.body);
		if (user) {
			const updatedUser = {
				...req.body,
				firstName: user.firstName,
				lastName: user.lastName,
			};
			console.log(updatedUser)
			res.status(201).json({
				message : "Updated user",
				data: updatedUser
			});
		} else {
			res.status(500).send({ message: "Internal Server Error" });
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
