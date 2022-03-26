const express = require('express');
// const USERS = require('../../dev-data/data/users.json');
const usersRouter = express.Router();
const {
  findUsersById,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  uploadAvatar,
  getUserById,
} = require('../../controllers/users');

const upload = require('../../utils/file-storage');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.use('/:id', findUsersById);
usersRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);
// usersRouter.patch('/:id', updateUser);
// usersRouter.delete('/:id', deleteUser);

usersRouter.post('/photo', upload.single('image'), uploadAvatar);
module.exports = usersRouter;