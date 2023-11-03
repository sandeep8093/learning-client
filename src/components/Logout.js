import { logout } from "../redux/apiCalls";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/language-communication-message-written_53876-127905.jpg?size=626&ext=jpg&ga=GA1.1.1942388.1698861392&semt=ais")
      center;
      left:0;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-left:210px;
  margin-bottom:20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  margin-left:150px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top:10px;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  &:hover {
    background-color: black;
  }
`;

const Error = styled.span`
  color: red;
`;

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        try {
            console.log("hello");
            window.localStorage.clear();
            logout(dispatch)
            navigate('/login'); // Redirect to the login upon successful registration
          } catch (error) {
            console.error('Registration failed:', error);
          }
        
    };
  return (<>
    <Navbar />
    <Container>
      
      <Wrapper>
        <Title>Log Out</Title>
        <Form>
            <p>Come Back Soon, We will be missing you!!</p>
            <Button onClick={handleClick} >
            LOGOUT
          </Button>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Logout;
