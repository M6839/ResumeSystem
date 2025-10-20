import React from 'react'
import Education from '../components/Education'
import { useState } from 'react';
import Experience from '../components/Experience';
import Certification from '../components/Certification';
import Project from '../components/Project';
import PersonalInfo from '../components/PersonalInfo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';
import { PDFViewer } from "@react-pdf/renderer";
import Skills from '../components/Skills';
const initialResumeData = {
  id:'',
  personalInfo: { 
    name: '', 
    email: '', 
    phone: '', 
    location: '',
    linkedin: '',
    github: '',
    portfolio: '' 
  },
  education: [],
  experience: [],
  projects: [],
  skills:[],
  certifications: []
};
const Dashboard = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
   const navigate = useNavigate();
 const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    setShowPreview(!showPreview); 
  };
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found. Please log in again.");
    navigate("/login");
    return;
  }

  async function load() {
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const user = res.data.user;

      
        const transformedData = {
          id: user.id,
          personalInfo: {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.location || '',
            linkedin: user.linkedin || '',
            github: user.github || '',
            portfolio: user.portfolio || ''
          },
          education: user.education || [],
          experience: user.experience || [],
          projects: user.projects || [],
          skills: user.skills || [],
          certifications: user.certifications || [],
          activities: user.activities || []
        };

        setResumeData(transformedData);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load user data. Please log in again.");
      navigate("/login");
    }
  }

  load();
}, [navigate]);

 function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume System</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={()=>{
            logout();
          }}
        >
          Logout
        </button>
      </div>
        <PersonalInfo resumeData={resumeData} setResumeData={setResumeData}/>
        <Skills resumeData={resumeData} setResumeData={setResumeData}/>
        <Education resumeData={resumeData} setResumeData={setResumeData}/>
        <Experience resumeData={resumeData} setResumeData={setResumeData}/>
        <Project resumeData={resumeData} setResumeData={setResumeData}/>
        <Certification resumeData={resumeData} setResumeData={setResumeData}/>
        <div className='flex items-cneter justify-between gap-4'>
         <button className="flex-1 bg-green-500 text-white py-2 px-4 md:h-[45px] rounded hover:bg-green-600">
          <PDFDownloadLink 
            document={<ResumePDF resumeData={resumeData} />} 
            fileName="resume.pdf"
            className="text-white no-underline"
          >
            {({ loading }) => loading ? 'Generating PDF...' : 'Download PDF'}
          </PDFDownloadLink>
        </button>
       <button
        onClick={handlePreviewClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {showPreview ? "Hide Resume Preview" : "Show Resume Preview"}
      </button>
        </div>
         {showPreview && (
        <div className="w-full border rounded-lg shadow-md mt-4">
          <PDFViewer width="100%" height="600">
            <ResumePDF resumeData={resumeData} />
          </PDFViewer>
        </div>
      )}
        
    </div>
  )
}

export default Dashboard