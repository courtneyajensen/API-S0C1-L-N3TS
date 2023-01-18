const { Thought, User } = require("../models");

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error fetching thoughts" });
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "Thought with Id not found" });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error fetching thought" });
        }
    },
    
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Thought created! No user with this id!" });
            }
            res.json({ message: "Thought created!" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error creating thought!" });
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought with this id found!" });
            }
            res.json(thought);
        } catch (err) {
            console.log (err);
            res.status(500).json({ message: "Error updating thought" });
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "No thought with this id!" });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Thought created but no user with this id found!" });
            }
            res.json({ message: "Thought deleted!" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting thought" });
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought with this id!" });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error adding reaction!" });
        }
    },

    asynce removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought with this Id!" });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error removing reaction!" });
        }
    },
};

module.exports = thoughtController