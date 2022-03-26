const User = require('../models/User');
const { catchAsync } = require('../utils/utils');

module.exports = {
    findUsersById: catchAsync(async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        try {

            const user = await User.findById(id);
            req.user = user;
            next();
        }
        catch {
            return next({
                status: 'failure',
                message: 'User not found',

            })
        }


    }),
    getAllUsers: catchAsync(async (req, res) => {
        const users = await User.find();
        res.json({
            status: 'success',
            data: users,

        })
    }),
    getUserById: catchAsync(async (req, res) => {

        const user = req.user;

        res.json({
            status: 'success',
            data: user,
        });
    }),
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });
        res.json({
            status: 'success',
            data: user,
        });
    },
    deleteUser: async (req, res, next) => {
        await User.findByIdAndUpdate(req.user.id, { active: false });
        res.status(204).json({
            status: 'success',
            data: null,
        });
    },
    updateUser: async (req, res, next) => {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    },
    uploadAvatar: async (req, res) => {
        const user = await User.findByIdAndUpdate(
            // req.userId,
            '623dd79c056c715783dd2408',
            { avatar: req.file.path },
            { new: true }
        );
        res.json({ status: 'success', data: user });
    },
}