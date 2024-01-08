const mongoose = require("mongoose");

module.exports = () => {
	const uri = "mongodb+srv://mrugesh:8VELEGzdD3aImI8X@mern-auth.qsidx23.mongodb.net/auth?retryWrites=true&w=majority";
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	mongoose.set('strictQuery',true);

	try {
		mongoose.connect(uri, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
