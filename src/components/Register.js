import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.istockphoto.com/id/1406124833/vector/problems-in-communication-vector-concept.jpg?s=2048x2048&w=is&k=20&c=uil4cQgKS59fuebVQBGwH0kYdlKc-AoAkKt03JIkxts=")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
`;

const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0;
  color: #888;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #8a4fff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7238b5;
  }
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      await register(dispatch, { email, password, username });
      navigate('/login'); // Redirect to the login upon successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return (<>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
        <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button onClick={handleClick} disabled={isFetching}>
            Register
          </Button></Link>
          <Link to="/login" style={{ textDecoration: 'none', margin: '10px' }}>
            LOG INTO EXISTING ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
    </> );
};

export default Register;
