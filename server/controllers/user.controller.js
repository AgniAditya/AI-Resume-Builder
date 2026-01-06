import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const generateToken = async (userId) => {
    return jwt.sign({userId},process.env.JWT_TOKEN_SECERT,{expiresIn: process.env.JWT_TOKEN_EXPIRE})
}

//POST: api/user/register
const registerUser = async (req,res) => {
    try {
        const { name, email, password} = req.body;
        if([name,email,password].some((field) => field?.trim() === ""))
            return res.status(400).json({message: 'missing required fields.'});

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exist."})
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })

        const token = await generateToken(newUser._id)
        const createdUser = await User.findById(newUser._id).select(
            "-password"
        )
        if(!createdUser) return res.status(500).json({message: 'erver is not successfull to register user'});

        return res.status(200).json({
            message: 'User register successfully',
            user: createdUser,
            token
        })      

    } catch (error) {
        return res.status(400).json({message: error.message})
    }

}

//POST: api/user/login
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) 
            return res.status(400).json({message: 'missing required fields.'});

        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: 'user not found.'});

        if(user.comparePassword(password))
            return res.status(400).json({message: 'invalid password.'});

        const token = await generateToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password");

        return res.status(200).json({
            message: 'LoggIn successfully.',
            user: loggedInUser,
            token
        })
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//GET: api/user/data
const getUserById = async (req,res) => {
    try {
        const userId = req.userId
        const isUserFound = await User.findById(userId)
        if(!isUserFound) 
            return res.status(404).json({message: "User not found"});
        const user = await User.findById(isUserFound._id).select("-password");
        return res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//GET: api/user/resumes
const getUserResumes = async (req,res) => {
    try {
        const userId = req.userId
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error.message})
    }
}

export {
    registerUser,
    loginUser,
    getUserById,
    getUserResumes,
}