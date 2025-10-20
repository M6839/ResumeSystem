import React from 'react'
import { useEffect } from 'react';
import { getCertifications, addCertification, updateCertification, deleteCertification } from '../api';
const Certification = ({resumeData,setResumeData}) => {
     useEffect(() => {
        getCertifications(resumeData.id).then(res => {
          setResumeData({ ...resumeData, certifications: res.data });
        });
      }, []);
    
      const handleAddCertification = async () => {
        const newCertifi= { name:'',
     organization: '',
     issueDate:'',
     expiryDate:''
};
        const res = await addCertification(newCertifi,resumeData.id);
        setResumeData({ ...resumeData, certifications: [...resumeData.certifications, res.data] });
      };
    
      const handleCertificationChange = async (id, field, value) => {
        const certiToUpdate = resumeData.certifications.find(c=> c.id === id);
        certiToUpdate[field] = value;
        await updateCertification(id, certiToUpdate);
        setResumeData({
          ...resumeData,
          certifications: resumeData.certifications.map(c=> (c.id === id ? certiToUpdate : c))
        });
      };
       const handleRemoveCertification = async (id) => {
        await deleteCertification(id);
        setResumeData({ ...resumeData, education: resumeData.education.filter(c => c.id !== id) });
      };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <button 
            onClick={handleAddCertification}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <span className="mr-1">+</span> Add Certification
          </button>
        </div>
        
        {resumeData.certifications.length === 0 ? (
          <p className="text-gray-500">No certification entries yet</p>
        ) : (
          resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Certification #{index + 1}</h3>
                <button 
                  onClick={() => handleRemoveCertification(cert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Organization"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cert.organization}
                  onChange={(e) => handleCertificationChange(cert.id, 'organization', e.target.value)}
                />
                 <input
                  type="text"
                  placeholder="issueDate"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cert.issueDate}
                  onChange={(e) => handleCertificationChange(cert.id, 'issueDate', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="ExpiryDate"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cert.expiryDate}
                  onChange={(e) => handleCertificationChange(cert.id, 'expiryDate', e.target.value)}
                />
              </div>
            </div>
          ))
        )}
      </div>

  )
}

export default Certification