import { Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px;
  margin-left: 20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  margin-left: 5px;
`;

const Center = styled.div`
  text-align: center;
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 14, border: 'none' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>LEARNING_UP</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <MenuItem>User Profile</MenuItem>
              </Link>
              <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                <MenuItem>Leaderboard</MenuItem>
              </Link>
            <Link to="/logout" style={{ textDecoration: 'none' }}>
            <MenuItem >Logout</MenuItem>
            </Link> 
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;