import { Router } from 'express'
import { getUserById, loginUser, registerUser } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserById)

export default userRouter