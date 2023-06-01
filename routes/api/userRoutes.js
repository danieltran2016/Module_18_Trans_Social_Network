const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController');
  
  // /api/users get and post routes
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId get and put routes
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)

// /api/users/:userId/friends/:friendId post and delete routes 
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;