import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    resumes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "resume"
        }
    ]
},{timestamps: true})

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.comparePassword = function(userPassword){
    return bcrypt.compareSync(userPassword,this.password)
}

export const User = mongoose.model("User",userSchema)