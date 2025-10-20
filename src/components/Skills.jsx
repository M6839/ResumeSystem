import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../api';

const Skills = ({ resumeData, setResumeData }) => {
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const userId = resumeData.id;
const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_URL}/skills/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    })
      .then((res) => {
        setResumeData({ ...resumeData, skills: res.data });
      })
      .catch((err) => console.error(err));
  }, [userId]);

 
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/skills/${userId}`, {
        name: newSkill.trim(),
      },{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, res.data],
      });
      setNewSkill("");
      setShowInput(false);
    } catch (err) {
      console.error(err);
    }
  };


  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`${API_URL}/skills/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
      setResumeData({
        ...resumeData,
        skills: resumeData.skills.filter((s) => s.id !== id),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {resumeData.skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => handleDeleteSkill(skill.id)}
              className="ml-1 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {showInput && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter new skill"
            className="border border-gray-300 rounded px-2 py-1 flex-1"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}

      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
        >
          + Add Technical Skill
        </button>
      )}
    </div>
  );
};

export default Skills;
