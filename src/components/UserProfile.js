import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 40px;
  margin: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Added transition for box-shadow */
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  flex: 1;
  max-width: 400px;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Added box-shadow on hover */
  }
`;

const Sidebar = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  height: 100vh;
  width: 300px;
  position: fixed;
  left: 0;
  top: 20;
  font-family: 'Roboto', sans-serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;


const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px;
`;
const Button1 = styled.button`
  background-color: #e60000; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px;
`;

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  const fetchLanguageDetails = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://learning-up-server.onrender.com/language/list-one/${languageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data) {
        setLanguages((prev) => [
          ...prev,
          {
            languageId: languageId,
            name: response.data.name,
            imageUrl: response.data.imageUrl,
            exercises:response.data.exercises
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetProgress = async (languageId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `https://learning-up-server.onrender.com/user/reset-progress?languageId=${languageId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh the page after reset
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://learning-up-server.onrender.com/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(response.data);
        if (response.data.languageProficiency) {
          response.data.languageProficiency.forEach((item) => {
            fetchLanguageDetails(item.languageId);
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleGetExercises = (languageId,level) => {
    localStorage.setItem('languageId', languageId);
    localStorage.setItem('level', level);
 
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' , marginTop : '60px'}}>
        <Sidebar>
          <div style={{ margin: '20px' }}>
            <h2>User Profile</h2>
            <div style={{ marginBottom: '20px' }}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Joined: {new Date(user.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </Sidebar>
        <Content>
          {languages &&
            languages.map((language) => {
              const proficiency = user.languageProficiency.find((prof) => prof.languageId === language.languageId);
              const totalExercises = language.exercises.length;
              return (
                <Card key={language.languageId}>
                  <p>Language: {language.name}</p>
                  <img src={language.imageUrl} alt={language.name} style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
                  <p>Progress: {proficiency.progress}</p>
                  <p>Exercises Completed: {proficiency.exercisesCompleted.length}</p>
                  <p>Total Exercises: {totalExercises}</p> 
                  <Link to='/exercises'>
                    <Button onClick={() => handleGetExercises(language.languageId, 1)}>Go to Exercises</Button>
                  </Link>
                  <Button1 onClick={() => handleResetProgress(language.languageId)}>Reset Progress</Button1>
                </Card>
              );
            })}
        </Content>
      </div>
    </>
  );
};

export default UserProfile;