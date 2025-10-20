import React from "react";
import axios from "axios";
import { API_URL } from '../api';
const PersonalInfo = ({ resumeData, setResumeData }) => {
  async function handleProfileUpdate(e) {
    e.preventDefault(); 

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const res = await axios.put(
        `${API_URL}/users/me`,
        resumeData.personalInfo, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      console.log("Updated user:", res.data);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <form className="space-y-4" onSubmit={handleProfileUpdate}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.name}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: { ...resumeData.personalInfo, name: e.target.value },
            })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.email}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                email: e.target.value,
              },
            })
          }
        />
        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.phone}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                phone: e.target.value,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.location}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                location: e.target.value,
              },
            })
          }
        />
        <input
          type="url"
          placeholder="LinkedIn"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.linkedin}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                linkedin: e.target.value,
              },
            })
          }
        />
        <input
          type="url"
          placeholder="GitHub"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.github}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                github: e.target.value,
              },
            })
          }
        />
        <input
          type="url"
          placeholder="Portfolio"
          className="w-full p-2 border border-gray-300 rounded"
          value={resumeData.personalInfo.portfolio}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              personalInfo: {
                ...resumeData.personalInfo,
                portfolio: e.target.value,
              },
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Personal Info
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
