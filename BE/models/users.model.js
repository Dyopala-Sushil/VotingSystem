const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['voter','organizer','admin'],
        required: true,
        default: 'voter'
    },
    age:{
        type: Number,
        default:null
    },
    gender:{
        type:String,
        enum:['male','female','others']
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        default:null
    }
},{
    timestamps:true
})




const organizerSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required: true
    },
    companyAddress:{
        city:{
            type: String,
            required: true
        },
        ward:{
            type: Number,
            required: true
        }
    },
    companyLogo:{
        type:String,
        required: true
    },
    organizerLead:voterSchema
},{
    timestamps: true
})

const Voter = mongoose.model('Voter',voterSchema);
const Organizer = mongoose.model('Organizer', organizerSchema)

module.exports = {
    Voter,
    Organizer
};