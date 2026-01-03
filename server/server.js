import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import userRouter from "./routes/user.route.js"
import resumeRouter from "./routes/resume.route.js"
import aiRouter from "./routes/ai.route.js"

const app = express()
const PORT = process.env.PORT || 3000

// Connect Database
await connectDB()

app.use(express.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send("Server is live")
})

app.use('/api/user',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})