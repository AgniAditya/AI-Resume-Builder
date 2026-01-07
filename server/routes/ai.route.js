import { Router } from 'express'
import { enhanceJobDescription, enhanceProfessionalSummary, enhanceProjectDescription, uploadResume } from '../controllers/ai.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const aiRouter = Router()

aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc',protect,enhanceJobDescription)
aiRouter.post('/enhance-project-desc',protect,enhanceProjectDescription)
aiRouter.post('/upload-resume',protect,uploadResume)

export default aiRouter