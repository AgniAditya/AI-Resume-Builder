import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";

const ResumeBuilder = () => {

    const { resumeId } = useParams()

    const [resumedata,setresumedata] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        expirence: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: '#3B82F6',
        public: false
    })

    const [activeSectionIndex,setActiveSectionIndex] = useState(0)
    const [removeBackground,setRemoveBackground] = useState(false)

    const section = [
        { id: "personal", name: "Personal info", icon: User},
        { id: "summary", name: "Summary", icon: FileText},
        { id: "experince", name: "Experince", icon: Briefcase},
        { id: "education", name: "Education", icon: GraduationCap},
        { id: "projects", name: "Projects", icon: FolderIcon},
        { id: "skills", name: "Skills", icon: Sparkles},
    ]

    const activeSections = section[activeSectionIndex]

    const loadExistingResume = async () => {
        const resume = dummyResumeData.find(resume => resume._id === resumeId)
        if(resume){
            setresumedata(resume)
            document.title = resume.title
        }
    }

    useEffect(() => {
        loadExistingResume()
    },[])

    return (
        <div>
            <div className="max-w-7x1 mx-auto px-4 py-6">
                <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeftIcon className="size-4"/> Back to Dashborad
                </Link>
            </div>

            <div className="max-w-7x1 mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Form */}
                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            {/* progess bar using activeSectionIndex */}
                            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>
                            <hr className="absolute top-0 left-0 right-0 -2 h-1 bg-gradient-to-r from-green-500 to green-600 border-none transition-all duration-2000" style={{width: `${activeSectionIndex * 100 / (section.length - 1)}%`}}/>

                            {/* Section navigation */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div className="flex items-center">
                                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1,0))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === 0 && 'opacity-50'}`} disabled={activeSectionIndex === 0}>
                                        <ChevronLeft className="size-4"/> Previous
                                    </button>
                                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1,section.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === section.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === section.length - 1}>
                                        Next<ChevronRight className="size-4"/>
                                    </button>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {activeSections.id === 'personal' && (
                                    <PersonalInfoForm data={resumedata.personal_info} onChange={(data) => setresumedata((prev) => ({...prev,personal_info:data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:col-span-7 max-lg:mt-6">
                        <div>
                            {/*--- buttons --- */}
                        </div>
                        {/*--- resume preview --- */}
                        <ResumePreview data={resumedata} template={resumedata.template} accentColor={resumedata.accent_color}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeBuilder