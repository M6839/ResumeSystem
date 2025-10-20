import axios from 'axios';

export const API_URL = 'https://springboot-resumesystem-1.onrender.com/api';
const token = localStorage.getItem('token');

export const addEducation = (education,userId) => axios.post(`${API_URL}/education/${userId}`, education,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const getEducations = (userId) => axios.get(`${API_URL}/education/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const updateEducation = (id, education) => axios.put(`${API_URL}/education/${id}`, education,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const deleteEducation = (id) => axios.delete(`${API_URL}/education/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });


export const addExperience = (experience,userId) => axios.post(`${API_URL}/experience/${userId}`, experience,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const getExperiences= (userId) => axios.get(`${API_URL}/experience/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const updateExperience = (id, experience) => axios.put(`${API_URL}/experience/${id}`, experience,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const deleteExperience = (id) => axios.delete(`${API_URL}/experience/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });


export const addCertification = (certification,userId) => axios.post(`${API_URL}/certification/${userId}`, certification,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const getCertifications= (userId) => axios.get(`${API_URL}/certification/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const updateCertification = (id, certification) => axios.put(`${API_URL}/certification/${id}`, certification,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const deleteCertification= (id) => axios.delete(`${API_URL}/certification/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });

export const addProject = (project,userId) => axios.post(`${API_URL}/project/${userId}`, project,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const getProjects = (userId) => axios.get(`${API_URL}/project/${userId}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const updateProject = (id, project) => axios.put(`${API_URL}/project/${id}`, project,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
export const deleteProject = (id) => axios.delete(`${API_URL}/project/${id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
