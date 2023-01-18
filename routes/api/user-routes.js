const express = require("express");
const router = express.Router();

const userController = require('../../controllers/user-controller');

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

router.post("/:userId/friends/:friendId", userController.addFriend);
router.delete("/:userId/friends/:friendId", userController.removeFriend);
router.get("/:userId", userController.getSingleUser);

module.exports = router;