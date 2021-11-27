import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    phone: { type: Number, required: true},
    is_active: { type: Boolean, default: false},
    is_suspended: {type: Boolean, default: false},
    address: {
        type: ObjectId,
        default: undefined,
        ref: 'Address'
    },
    profile: {
        type: ObjectId,
        default: undefined,
        ref: 'Profile'
    },
    likes: [
        {
            type: ObjectId,
            default: 0,
            ref: 'Post'
        }
    ],
    posts: [
        {
            type: ObjectId,
            default: 0,
            ref: 'Post'
        }
    ]
},
{
    timestamps:true
})

export default mongoose.model('User', UserSchema);