import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_description: {type: String, required: true},
    image: {type: String, required: true},
    long_description: {type: String, required: true},
    author: {
        type: ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: ObjectId,
            default: 0,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: ObjectId,
            default: 0,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
})

export default mongoose.model('Post', PostSchema);