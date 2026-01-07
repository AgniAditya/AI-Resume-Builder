import { ai } from "../configs/ai.js";
import { Resume } from "../models/resume.model.js";

//POST: /api/ai/enhance-pro-sum
const enhanceProfessionalSummary = async (req,res) => {
    try {
        const { userContent } = req.body;
        if(!userContent.trim())
            return res.status(400).json({message: "Missing required fields."})
        const aiContent = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: userContent,
            config: {
                systemInstruction: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
            }
        })
        const enhanceContent = aiContent.text
        return res.status(200).json({enhanceContent})
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message: error.message})
    }
}

//POST: /api/ai/enhance-job-desc
const enhanceJobDescription = async (req,res) => {
    try {
        const { userContent } = req.body;
        if(!userContent.trim())
            return res.status(400).json({message: "Missing required fields."})
        const aiContent = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: userContent,
            config: {
                systemInstruction: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
            }
        })
        const enhanceContent = aiContent.text
        return res.status(200).json({enhanceContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//POST: /api/ai/enhance-project-desc
const enhanceProjectDescription = async (req,res) => {
    try {
        const { userContent } = req.body;
        if(!userContent.trim())
            return res.status(400).json({message: "Missing required fields."})
        const aiContent = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: userContent,
            config: {
                systemInstruction: "You are an expert in resume writing. Your task is to enhance the project description of a resume. The project description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
            }
        })
        const enhanceContent = aiContent.text
        return res.status(200).json({enhanceContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

//POST: /api/ai/upload-resume
const uploadResume = async (req,res) => {
    try {
        const { resumeText,title } = req.body;
        const userId = req.userId
        if(!resumeText.trim())
            return res.status(400).json({message: "Missing required fields."})
        const aiContent = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: `extract data from this resume: ${resumeText}`,
            config: {
                systemInstruction: "You are an expert AI agent to extract data from resume.",
                responseMimeType: 'application/json',
                responseJsonSchema: {
                    type: 'object',
                    properties: {
                        professional_summary: {
                            type: String,
                            default: ""
                        },
                        skills: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        personal_info: {
                            type: "object",
                            properties: {
                                full_name: {
                                    type: String,
                                    default: ''
                                },
                                email: {
                                    type: String,
                                    default: ''
                                },
                                phone: {
                                    type: String,
                                    default: ''
                                },
                                location: {
                                    type: String,
                                    default: ''
                                },
                                linkedin: {
                                    type: String,
                                    default: ''
                                },
                                website: {
                                    type: String,
                                    default: ''
                                },
                                profession: {
                                    type: String,
                                    default: ''
                                },
                                image: {
                                    type: String,
                                    default: ''
                                }
                            }
                        },
                        experience: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    company: { type: "string" },
                                    position: { type: "string" },
                                    start_date: { type: "string" },
                                    end_date: { type: "string" },
                                    description: { type: "string" },
                                    is_current: { type: "boolean" }
                                }
                            }
                        },
                        project: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: String
                                    },
                                    type: {
                                        type: String
                                    },
                                    description: {
                                        type: String
                                    }
                                }
                            }
                        },
                        education: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {

                                    institution: {
                                        type: String
                                    },
                                    degree: {
                                        type: String
                                    },
                                    field: {
                                        type: String,
                                    },
                                    graduation_date: {
                                        type: String,
                                    },
                                    gpa: {
                                        type: String,
                                    },
                                }
                            }
                        }
                    }
                }
            }
        })
        const extractedData = aiContent.text
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId,title,...parsedData})

        return res.status(200).json({resumeId: newResume._id})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error.message})
    }
}

export {
    enhanceProfessionalSummary,
    enhanceJobDescription,
    enhanceProjectDescription,
    uploadResume
}