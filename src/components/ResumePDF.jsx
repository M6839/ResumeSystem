import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: "#fff" },
  section: { marginBottom: 10 },
  heading: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 2 },
});


const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>{resumeData.personalInfo.name}</Text>
      <Text style={styles.text}>{resumeData.personalInfo.email}</Text>
      <Text style={styles.text}>{resumeData.personalInfo.phone}</Text>
      <Text style={styles.text}>{resumeData.personalInfo.location}</Text>
      <Text style={styles.text}>{resumeData.personalInfo.linkedin}</Text>
      <Text style={styles.text}>{resumeData.personalInfo.github}</Text>
     <Text style={styles.text}>{resumeData.personalInfo.portfolio}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {resumeData.education.map((edu, index) => (
            <View key={index}>
                <Text  style={styles.text}>
            {edu.degree} - {edu.instistution} ({edu.year})
          </Text>
          <Text style={styles.text}>CGPA: {edu.cgpa}</Text>
            </View>
          
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        {resumeData.skills.map((skill, index) => (
            <View key={index}>
                <Text  style={styles.text}>
           {skill.name}
          </Text>
            </View>
          
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        {resumeData.experience.map((exp, index) => (
            <View key={index}>
                 <Text>
            {exp.position} at {exp.company} ({exp.duration})
          </Text>
          <Text style={styles.text}>
            {exp.description}
          </Text>
            </View>
         
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.heading}>Projects</Text>
        {resumeData.projects.map((pro, index) => (
            <View key={index}>
                <Text>
            {pro.title} -({pro.technologies})
          </Text>
            <Text style={styles.text}>{pro.description}</Text>
            </View>
          
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Certifications</Text>
        {resumeData.certifications.map((c, index) => (
          <Text key={index} style={styles.text}>
            {c.name} -{c.organization} ({c.issueDate} to {c.expiryDate})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);


export default ResumePDF;