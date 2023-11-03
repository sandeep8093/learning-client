import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../components/Navbar";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif; /* Change the font family to a modern style */
  margin-top:60px
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
`;

const DataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
`;

const Description = styled.div`
  flex: 1;
  padding: 0 20px;
  font-family: Arial, sans-serif; /* Change the font family to a modern style */
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background-color: #ddccff;
  width: 100%;
  margin-top: 50px;
`;

const DescriptionText = styled.p`
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-family: Arial, sans-serif; /* Change the font family to a modern style */
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #6f42c1;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:disabled {
    background-color: #b2b2b2;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #5a32a3;
  }
`;

const StaticData = styled.div`
  max-width: 1000px;
  text-align: center;
`;

const StaticText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

const HomePage = () => {
  const data = [
    {
      id: 1,
      title: "Improves Cognitive Skills",
      description: "Learning a new language can enhance your cognitive skills such as problem-solving, critical thinking, and memory.",
      image: "https://img.freepik.com/free-vector/flat-international-mother-language-day-illustration_23-2149219243.jpg?size=626&ext=jpg&ga=GA1.1.1942388.1698861392&semt=ais"
    },
    {
      id: 2,
      title: "Boosts Multitasking Abilities",
      description: "Bilingual individuals are often better at multitasking and managing complex tasks.",
      image: "https://img.freepik.com/free-vector/hand-drawn-english-book-background_23-2149483336.jpg?size=626&ext=jpg&ga=GA1.1.1942388.1698861392&semt=ais"
    },
    {
      id: 3,
      title: "Expands Career Opportunities",
      description: "Being proficient in multiple languages can open up a plethora of job opportunities in various sectors.",
      image: "https://img.freepik.com/free-vector/translator-concept-illustration_114360-6614.jpg?size=626&ext=jpg&ga=GA1.1.1942388.1698861392&semt=ais"
    }
  ];

  return (
    <>
      <Navbar />
      <HomeContainer>
        <Title>Welcome to the Language Learning Game!</Title>
        <StaticData>
          <StaticText>
            Explore the diverse world of languages and embark on a journey of cultural discovery and cognitive growth. With our immersive language learning program, you can enrich your skills, broaden your horizons, and connect with people from different backgrounds. Start your adventure today!
          </StaticText>
        </StaticData>
        <DescriptionText>Benefits of Language Learning</DescriptionText>
        <DataContainer>
          {data.map((item, index) => (
            <DataItem key={item.id}>
              {index % 2 === 0 ? (
                <>
                  <Description>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </Description>
                  <Image src={item.image} alt={item.title} />
                </>
              ) : (
                <>
                  <Image src={item.image} alt={item.title} />
                  <Description>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </Description>
                </>
              )}
            </DataItem>
          ))}
        </DataContainer>
        <ContentContainer>
          <DescriptionText>Start your Language Learning journey today.</DescriptionText>
          <Link to="/languages" style={{ textDecoration: 'none' }}>
            <Button>Choose Your Language</Button>
          </Link>
        </ContentContainer>
      </HomeContainer>
    </>
  );
};

export default HomePage;
