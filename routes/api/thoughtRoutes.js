const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts for get and post routes
router.route('/')
.get(getThought)
.post(createThought);

// /api/thoughts/:thoughtId for get put and delete routes
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions for post routes
router.route('/:thoughtId/reactions')
.post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId delete reaction routes
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;
