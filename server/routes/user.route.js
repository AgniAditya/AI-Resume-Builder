import { Router } from 'express'
import { getUserById, getUserResumes, loginUser, registerUser } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserById)
userRouter.get('/resumes',protect,getUserResumes)

export default userRouter