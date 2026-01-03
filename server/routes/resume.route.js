import { Router } from 'express'
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resume.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import upload from '../configs/multer.js'

const resumeRouter = Router()

resumeRouter.post('/create',protect,createResume)
resumeRouter.delete('/delete/:resumeId',protect,deleteResume)
resumeRouter.get('/get/:resumeId',protect,getResumeById)
resumeRouter.get('/public/:resumeId',getPublicResumeById)
resumeRouter.put('/update',upload.single('image'),protect,updateResume)

export default resumeRouter