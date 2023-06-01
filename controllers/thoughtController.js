const {User, Thought} = require('../models');

module.exports ={
    //getting all thoughts 
    getThought(req, res) {
        Thought.find({}).then((thought) => res.json(thought)
        ).catch((err) => res.status(500).json(err));
      },
    //getting thoughy by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }).select("-__v")
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No Thought found with this ID!" })
              : res.json(thought)
          ).catch((err) => res.status(500).json(err));
      },

    //creating new though
    createThought(req, res) {
        Thought.create(req.body).then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No User found' })
              : res.json(thought)
          ).catch((err) => res.status(500).json(err));
      },

    //updating a thought 
    updateThought(req, res){
        Thought.findoneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, 
            new: true}
        )
        .then((thought)=>
        !thought
          ? res.status(404).json({message:'no thought found'})
          : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },

    //deleting thought 
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought found'})
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'thought deleted, no associated user found' })
              : res.json({ message: 'thought delted' })
          ).catch((err) => res.status(500).json(err));
      },

    //creating reaction 
    createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      ).catch((err) => res.status(500).json(err));
  },

    //deleting reaction 
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions:{reactionId: req.params.reactionId}}},
            {runValidators:true,
            new: true}
        )
        .then((thought) =>
        !thought 
            ? res.status(404).json({message:'no thought found'})
            : res.json(thought)
            ).catch((err) => res.status(500).json(err))
    }
};