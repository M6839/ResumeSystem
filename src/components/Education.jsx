import React from 'react';
import { useEffect } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
const Education = ({ resumeData, setResumeData }) => {
  const userId=resumeData.id;
 useEffect(() => {
    axios.get(`${API_URL}/education/${userId}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
        }).then(res => {
      setResumeData({ ...resumeData, education: res.data });
    });
  }, []);

  const handleAddEducation = async () => {
    const newEdu = { instistution: '', degree: '', year: '', cgpa: '', achievements: ''};
    const res = await axios.post(`${API_URL}/education/${userId}`,newEdu,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });
    setResumeData({ ...resumeData, education: [...resumeData.education, res.data] });
  };

  const handleEducationChange = async (id, field, value) => {
    const eduToUpdate = resumeData.education.find(e => e.id === id);
    eduToUpdate[field] = value;
    await axios.put(`${API_URL}/education/${id}`, eduToUpdate,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(e => (e.id === id ? eduToUpdate : e))
    });
  };
   const handleDeleteEducation = async (id) => {
    await axios.delete(`${API_URL}/education/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });
    setResumeData({ ...resumeData, education: resumeData.education.filter(e => e.id !== id) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={handleAddEducation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Education
        </button>
      </div>

      {resumeData.education.length === 0 ? (
        <p className="text-gray-500">No education entries yet</p>
      ) : (
        resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-4 p-4 border border-gray-300 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{edu.degree || 'New Education'}</h3>
              <button
                onClick={() => handleDeleteEducation(edu.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Institution"
                className="w-full p-2 border border-gray-300 rounded"
                value={edu.instistution}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'instistution', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Degree"
                className="w-full p-2 border border-gray-300 rounded"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'degree', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Year"
                className="w-full p-2 border border-gray-300 rounded"
                value={edu.year}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'year', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="GPA"
                className="w-full p-2 border border-gray-300 rounded"
                value={edu.cgpa}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'cgpa', e.target.value)
                }
              />
              <textarea
                placeholder="Achievements"
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
                value={edu.achievements}
                onChange={(e) =>
                  handleEducationChange(edu.id, 'achievements', e.target.value)
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Education;
