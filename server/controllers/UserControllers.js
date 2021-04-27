const { User } = require("../models");
const bcrypt = require("bcrypt");

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
		User.findOne({ email })
			.then((user) => {
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
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = UserController;
