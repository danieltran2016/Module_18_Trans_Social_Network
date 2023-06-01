const { User } = require('../models'); 

module.exports = {
    //getting all users
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },
    //getting single user by id
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .populate('thoughts')
        .populate('friends')
        .select('-__V')
        .then((user)=>
        !user
            ? res.status(404).json({message: 'no user found'})
            : res.json(user)
            ).catch((err)=>res.status(500).json(err));
    },

    //creating new user
    createUser(req,res){
        User.create(req.body)
        .then((user)=>res.json(user))
        .catch((err)=>res.status(500).json(err));
    },

    //updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User found" })
              : res.json(user)
          ).catch((err) => res.status(500).json(err));
      },
    //adding a friend 
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators:true,
            new:true}
        )
            .then((user)=>
            !user
                ? res.status(404).json({message:'no user found'})
                : res.json(user)
            ).catch((err) => res.status(500).json(err));
    },

    //deleting friend
    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new:true}
        )
            .then((user) =>
                !user   ?res.status(404).json({message:'no user found'})
                :res.json(user)
            ).catch((err) =>res.status(500).json(err));
    }

};
