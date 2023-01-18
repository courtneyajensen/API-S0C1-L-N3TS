const { User, Thought } = require("../models");

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select("-__v");
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error getting all users." });
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select("-__v").populate("friends").populate("thoughts");
            if (!user) {
                return res.status(404).json({ message: "No user with this id found!" });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error getting user." });
        }
    },

    async createUser(req, res) {
        try {
            const newUser = new User({...req.body});
            await newUser.save();
            res.json(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deletedUser = await User. findOneAndDelete({ _id: req.params.userId });
            if (!deletedUser) {
                return res.status(404).json({ message: "No user with this Id found!" });
            }
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: "User and thoughts have been deleted successfully!" });
        } catch (err) {
            console.log (err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "No user with this id found!" });
            }
            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "No user with this id found!" });
            }
            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error removing friend." });
        }
    }
};

module.exports = userController;