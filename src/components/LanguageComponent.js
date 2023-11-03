import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../components/Navbar";

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
  max-width: 350px;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Added box-shadow on hover */
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6f42c1;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a32a3;
  }
`;

const LanguageComponent = () => {
  const [languages, setLanguages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  const fetchLanguages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/language/list-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageClick = (languageId) => {
    setSelectedLanguage(languageId);
    setShowPopup(true);
  };

  const handlePopupConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://learning-up-server.onrender.com/user/add-progress?languageId=${selectedLanguage}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Available Languages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {languages.map((language) => (
            <Card key={language._id} onClick={() => handleLanguageClick(language._id)}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={language.imageUrl} alt={language.name} style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
                <p style={{ fontSize: '1.8rem', marginTop: '15px' }}>{language.name}</p>
              </div>
            </Card>
          ))}
        </div>
        {showPopup && (
          <Popup>
            <PopupContent>
              <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Are you sure you want to select this language?</p>
              <ConfirmButton onClick={handlePopupConfirm}>Confirm</ConfirmButton>
              <button onClick={handlePopupCancel} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#ccc', cursor: 'pointer' }}>Cancel</button>
            </PopupContent>
          </Popup>
        )}
      </div>
    </>
  );
};

export default LanguageComponent;
