import { Resume } from "../models/resume.model.js"
import imagekit from "../configs/imagekit.js"
import fs from 'fs'

//POST: /api/resumes/create
const createResume = async (req,res) => {
    try {
        const userId = req.userId
        const { title } = req.body
        console.log(title)
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
        }).select("-__v -createdAt -updatedAt")
        if(!resume)
            return res.status(404).json({message: "Resume not found"});

        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


//GET: /api/resumes/public
const getPublicResumeById = async (req,res) => {
    try {
        const {resumeId} = req.params
        const resume = await Resume.findOne({_id: resumeId,public: true}).select("-__v -createdAt -updatedAt")
        if(!resume)
            return res.status(404).json({message: "Resume not found"});
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//PUT: /api/resumes/update
const updateResume = async (req,res) => {
    try {
        const userId = req.userId
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file
        
        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData)
        }else{
            resumeDataCopy = structuredClone(resumeData)
        }

        if(image){
            const imageBufferData = fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }

        const updatedResume = await Resume.findByIdAndUpdate(
            {_id: resumeId,userId: userId},
            {
                $set: resumeDataCopy
            },
            {new: true}
        )

        return res.status(200).json({message: "saved successfully",updatedResume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export {
    createResume,
    deleteResume,
    getResumeById,
    getPublicResumeById,
    updateResume
}