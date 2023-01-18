const express = require("express");
const router = express.Router();
const thoughtController = require('../../controllers/thought-controller');

router.get("/", thoughtController.getThoughts);
router.post("/", thoughtController.createThought);
router.put("/:thoughtId", thoughtController.updateThought);
router.delete("/:thoughtId", thoughtController.deleteThought);

router.get("/:thoughtId", thoughtController.getSingleThought);
router.post("/:thoughtId/reactions", thoughtController.addReaction);
router.delete("/:thoughtId/reactions/:reactionId", thoughtController.removeReaction);

module.exports = router;