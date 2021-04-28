const PhotoControllers = require("../controllers/PhotoControllers");
const UserController = require("../controllers/UserControllers");
const { auth } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/photos", auth, PhotoControllers.read);

module.exports = router;
