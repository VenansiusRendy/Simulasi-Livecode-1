const UserController = require("../controllers/UserControllers");
const router = require("express").Router();

router.post("/register", UserController.register);
router.get("/login", UserController.login);

module.exports = router;
