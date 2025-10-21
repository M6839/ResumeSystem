import React from 'react'
import { useEffect } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
const Project = ({resumeData,setResumeData}) => {
  const token = localStorage.getItem('token');
  const userId=resumeData.id;
    useEffect(() => {
       axios.get(`${API_URL}/project/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    }).then(res => {
          setResumeData({ ...resumeData, projects: res.data });
        });
      }, []);
    
      const handleAddProject = async () => {
        const newProje = { title:'', link: '', technologies: '', description: ''};
        const res = await axios.post(`${API_URL}/project/${userId}`,newProje,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
        setResumeData({ ...resumeData, projects:[...resumeData.projects, res.data] });
      };
    
      const handleProjectChange = async (id, field, value) => {
        const projeToUpdate = resumeData.projects.find(p => p.id === id);
        projeToUpdate[field] = value;
        await axios.put(`${API_URL}/project/${id}`, projeToUpdate,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
        setResumeData({
          ...resumeData,
        projects: resumeData.projects.map(p=> (p.id === id ? projeToUpdate: e))
        });
      };
       const handleRemoveProject = async (id) => {
        await axios.delete(`${API_URL}/project/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
        setResumeData({ ...resumeData, projects: resumeData.projects.filter(p => p.id !== id) });
      };
    
  return (
     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button 
            onClick={handleAddProject}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <span className="mr-1">+</span> Add Project
          </button>
        </div>
        
        {resumeData.projects.length === 0 ? (
          <p className="text-gray-500">No project entries yet</p>
        ) : (
          resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Project #{index + 1}</h3>
                <button 
                  onClick={() => handleRemoveProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={project.title}
                  onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Technologies"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="Link"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={project.link}
                  onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                />
              </div>
            </div>
          ))
        )}
      </div>
  )
}

export default Project