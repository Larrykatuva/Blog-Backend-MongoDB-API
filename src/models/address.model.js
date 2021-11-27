import mongoose from 'mongoose';


const AddressSchema = new mongoose.Schema({
    location: { type: String },
    city: { type: String },
    code: { type: String },
    country: { type: String }
},
{
    timestamps: true
})

export default mongoose.model('Address', AddressSchema);