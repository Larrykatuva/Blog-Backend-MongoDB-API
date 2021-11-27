import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    image: { type: String, required: true},
    skills: [
        { type: String}
    ],
    hobbies: [
        { type: String}
    ],
    linkedin: { type: String },
    github: { type: String }
},{
    timestamps: true
})

export default mongoose.model('Profile', ProfileSchema);