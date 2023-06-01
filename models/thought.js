const {Schema, model} = require('mongoose');

//reaction Schema model 
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//thought Schema model 
const thoughtSchema = new Schema (
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
//create virtual to get the total count of friends in the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;