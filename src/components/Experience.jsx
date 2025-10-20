import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../api';
const Experience = ({ resumeData, setResumeData }) => {

  
useEffect(() => {
    getExperiences(resumeData.id).then(res => {
      setResumeData({ ...resumeData, experience: res.data });
    });
  }, []);

  const handleAddExperience = async () => {
    const newExp = {  company: '',
      position: '',
      duration: '',
      location: '',
      description: ''};
    const res = await addExperience(newExp,resumeData.id);
    setResumeData({ ...resumeData, experience: [...resumeData.experience, res.data] });
  };

  const handleExperienceChange = async (id, field, value) => {
    const expToUpdate = resumeData.experience.find(e => e.id === id);
    expToUpdate[field] = value;
    await updateExperience(id, expToUpdate);
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(e => (e.id === id ? expToUpdate : e))
    });
  };
   const handleRemoveExperience = async (id) => {
    await deleteExperience(id);
    setResumeData({ ...resumeData, experience: resumeData.experience.filter(e => e.id !== id) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <span className="mr-1">+</span> Add Experience
        </button>
      </div>

      {resumeData.experience.length === 0 ? (
        <p className="text-gray-500">No experience entries yet</p>
      ) : (
        resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="mb-4 p-4 border border-gray-200 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Experience #{index + 1}</h3>
              <button
                onClick={() => handleRemoveExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company"
                className="w-full p-2 border border-gray-300 rounded"
                value={exp.company}
                onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                className="w-full p-2 border border-gray-300 rounded"
                value={exp.position}
                onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                className="w-full p-2 border border-gray-300 rounded"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded"
                value={exp.location}
                onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={exp.description}
                onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Experience;
