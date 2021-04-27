const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
	static register(req, res) {
		const { email, password } = req.body;
		User.create({ email, password })
			.then((user) => {
				res
					.status(201)
					.json({ success: true, data: { id: user.id, email: user.email } });
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
	static login(req, res) {
		const { email, password } = req.body;
		User.findOne({ where: { email } })
			.then((user) => {
				console.log(user);
				if (!user) {
					res
						.status(404)
						.json({ success: false, error: "User/Password not match" });
				}
				const match = bcrypt.compareSync(password, user.password);
				if (!match) {
					res
						.status(404)
						.json({ success: false, error: "User/Password not match" });
				}
				const access_token = jwt.sign(
					{ id: user.id, email: user.email },
					process.env.JWT_SECRET
				);
				res.status(200).json({
					success: true,
					data: { id: user.id, email: user.email, access_token },
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = UserController;
