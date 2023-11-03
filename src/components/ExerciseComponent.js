import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from "../components/Navbar";

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Arial', sans-serif;
`;

const Question = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
`;

const OptionItem = styled.li`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e4e4f4;
  }
`;

const StyledButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: 10px auto;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 8px;
  width: 50%;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ExerciseComponent = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const languageId = localStorage.getItem('languageId');
  const level = localStorage.getItem('level');

  const fetchExercises = async (languageId, level) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://learning-up-server.onrender.com/exercise/get?languageId=${languageId}&difficultyLevel=${level}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExercises(languageId, userScore);
  }, [languageId, userScore]);

  const handleNextExercise = () => {
    const hasHigherDifficultyExercises = exercises.some(exercise => exercise.difficultyLevel > userScore);
    const hasSameDifficultyExercises = exercises.some(exercise => exercise.difficultyLevel === userScore);
    let nextScore = isAnswerCorrect ? Math.min(userScore + 1, 5) : Math.max(userScore - 1, 1);
    const canProgress = hasHigherDifficultyExercises && currentExercise < exercises.length - 1;
  
    if (canProgress) {
      setCurrentExercise(currentExercise + 1);
      setSelectedOption(null);
      setSubmissionMessage("");
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(false);
      setUserScore(nextScore);
    } else if (!hasHigherDifficultyExercises && hasSameDifficultyExercises) {
      nextScore = userScore; // Keep the nextScore the same if no higher difficulty exercises exist
    } else if (!hasSameDifficultyExercises) {
      const decrementedScore = Math.max(userScore - 1, 1);
      nextScore = exercises.some(exercise => exercise.difficultyLevel === decrementedScore) ? decrementedScore : 1;
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setSelectedOption(null);
      setSubmissionMessage("");
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(false);
      setUserScore(1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!isAnswerSubmitted && selectedOption) {
        const response = await axios.post(
          'https://learning-up-server.onrender.com/exercise/submit',
          {
            languageId: languageId,
            exerciseId: exercises[currentExercise]._id,
            userAnswer: selectedOption,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isCorrect) {
          setSubmissionMessage(<span style={{ color: 'green' }}>Correct Answer! Yay you got : {exercises[currentExercise].difficultyLevel} points</span>);
        } else {
          setSubmissionMessage(<span style={{ color: 'red' }}>Incorrect! The correct answer is: {exercises[currentExercise].correctAnswer}</span>);
        }
        setIsAnswerCorrect(response.data.isCorrect);
        setIsAnswerSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <QuizWrapper>
        <h2>Exercises</h2>
        {exercises.length > 0 && (
          <div style={{ width: '100%' }}>
            <Question>{exercises[currentExercise].question}</Question>
            <OptionsList>
              {exercises[currentExercise].options.map((option, index) => (
                <OptionItem
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  style={{
                    backgroundColor: selectedOption === option ? '#f2d9f2' : '#f4f4f4',
                  }}
                >
                  {option}
                </OptionItem>
              ))}
            </OptionsList>
            <StyledButton onClick={handleSubmitAnswer} disabled={!selectedOption || isAnswerSubmitted}>
              Submit Answer
            </StyledButton>
          </div>
        )}
        {submissionMessage && <p>{submissionMessage}</p>}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <StyledButton onClick={handlePreviousExercise} disabled={currentExercise === 0}>
            Previous Exercise
          </StyledButton>
          <StyledButton onClick={handleNextExercise} disabled={currentExercise === exercises.length - 1}>
            Next Exercise
          </StyledButton>
        </div>
      </QuizWrapper>
    </>
  );
};

export default ExerciseComponent;