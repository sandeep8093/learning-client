import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://media.istockphoto.com/id/1277041996/vector/illustration-of-two-happy-people-talking-via-video-call.jpg?s=2048x2048&w=is&k=20&c=ZEjeqG31uk5owO86iWlerRQuOpKbPrJPcCCp-noCkgw=")
      center;
  left: 0;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 14px;
//   text-decoration: underline;
//   cursor: pointer;
//   text-align: center;
// `;

const Error = styled.span`
  color: red;
  text-align: center;
  margin: 10px 0;
`;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
 
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response= await login(dispatch, { email, password });
      navigate('/'); // Redirect to the homepage upon successful registration
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (<>
    <Navbar />
    <Container>
      
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/" style={{ textDecoration: 'none' }}>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button></Link>
          <Link to="/register" style={{ textDecoration: 'none', margin: '10px' }}>
            CREATE A NEW ACCOUNT
          </Link>
          {error && <Error>Something went wrong...</Error>}
          
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Login;
