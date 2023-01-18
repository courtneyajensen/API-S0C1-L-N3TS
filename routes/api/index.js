const express = require("express");
const router = express.Router();

router.use("/user", require("./user-routes"));
router.use("/thoughts", require("./thought-routes"));

module.exports = router;