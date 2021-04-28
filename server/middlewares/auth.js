const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = (req, res, next) => {
	const { access_token } = req.headers;
	if (!access_token) {
		res.status(400).json({ success: false, error: "Missing Access Token" });
	}
	try {
		const verify = jwt.verify(access_token, process.env.JWT_SECRET);
		req.user_id = verify.id;
	} catch (error) {
		res.status(400).json({ success: false, error: "Token Invalid" });
	}

	User.findByPk(req.user_id)
		.then((user) => {
			if (!user) throw { error: "Login Fail" };
			next();
		})
		.catch((err) =>
			res.status(400).json({ success: false, error: "Login Fail" })
		);
};

module.exports = { auth };
