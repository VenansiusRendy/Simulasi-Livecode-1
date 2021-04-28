const { Photo } = require("../models");

class PhotoControllers {
	static read(req, res) {
		const user_id = req.user_id;
		console.log(user_id);
		Photo.findAll({ where: { UserId: user_id } })
			.then((photos) => {
				res.status(200).json({ success: true, photos });
			})
			.catch((err) => {
				res
					.status(500)
					.json({ success: false, error: "Internal server error" });
			});
	}
}

module.exports = PhotoControllers;
