import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from "../components/Navbar";

const LeaderboardWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 20px;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const LeaderboardHeader = styled.th`
  background-color: #f2f2f2;
  padding: 12px 15px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const LeaderboardRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const LeaderboardData = styled.td`
  padding: 12px 15px;
  font-size: 16px;
`;
const Select = styled.select`
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  color: #555555;
  font-size: 16px;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  outline: none;
  width: 450px;

  &:hover {
    border-color: #b9b9b9;
  }

  &:focus {
    border-color: #4d90fe;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const languageId = localStorage.getItem('languageId');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/language/get-user-languages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLanguages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/language/leaderboard-list?languageId=${languageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeaderboard(response.data);
      setSelectedLanguage(languageId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <LeaderboardWrapper>
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Language Leaderboard</h1>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
          <Option value="">Select a language</Option>
          {languages.map((language) => (
            <Option key={language._id} value={language.languageId}>
              {language.name}
            </Option>
          ))}
        </Select>
         
        </div>
        <LeaderboardTable>
          <thead>
            <tr>
              <LeaderboardHeader>Rank</LeaderboardHeader>
              <LeaderboardHeader>Username</LeaderboardHeader>
              <LeaderboardHeader>Score</LeaderboardHeader>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <LeaderboardRow key={user._id}>
                <LeaderboardData>{index + 1}</LeaderboardData>
                <LeaderboardData>{user.username}</LeaderboardData>
                <LeaderboardData>{user.progress}</LeaderboardData>
              </LeaderboardRow>
            ))}
          </tbody>
        </LeaderboardTable>
      </LeaderboardWrapper>
    </>
  );
};

export default Leaderboard;