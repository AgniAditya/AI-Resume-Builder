import { Resume } from "../models/resume.model"

//POST: /api/resumes/create
const createResume = async (req,res) => {
    try {
        const userId = req.userId
        const { title } = req.body

        const newResume = await Resume.create({
            userId: userId,
            title: title
        })

        return res.status(200).json({
            message: "resume created successfully.",
            resume: newResume
        })
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//DELETE: /api/resumes/delete
const deleteResume = async (req,res) => {
    try {
        const userId= req.userId
        const { resumeId } = req.params

        await Resume.findOneAndDelete({userId,_id: resumeId})

        return res.status(200).json({message: "resume deleted successfully."})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//GET: /api/resumes/get
const getResumeById = async (req,res) => {
    try {
        const userId= req.userId
        const { resumeId } = req.params
    
        const resume = await Resume.findOne({
            userId: userId,
            _id: resumeId
        })
        if(!resume)
            return res.status(404).json({message: "Resume not found"});
    
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


//GET: /api/resumes/public
const getPublicResumeById = async (req,res) => {
    try {
        const resumeId = req.params
        const resume = await Resume.findOne({_id: resumeId,public: true})
        if(!resume)
            return res.status(404).json({message: "Resume not found"});
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export {
    createResume,
    deleteResume,
    getResumeById,
    getPublicResumeById,
}