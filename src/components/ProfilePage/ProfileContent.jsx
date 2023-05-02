import styled from "styled-components";
import profileImg from "../../assets/icons/profile-icon/activatedicons.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";

export default function ProfileContent() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_LINK_API}/user/info`, config)
      .then((res) => {
        const { name, email } = res.data;
        setUserInfo({
          name,
          email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!userInfo) {
    return (
      <Loading>
        <MagnifyingGlass width={110} height={110} color="#4d3837" />
      </Loading>
    );
  }

  return (
    <ProfileContainer>
      <ProfileInfo>
        <img src={profileImg} alt="" />
        <div>
          <h2>{userInfo.name}</h2>
          <h3>{userInfo.email}</h3>
        </div>
      </ProfileInfo>
      <Logout>
        <button onClick={logOut}>Logout</button>
      </Logout>
    </ProfileContainer>
  );
}

const Loading = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35vh;
`;

const Logout = styled.div`
  button {
    color: #ffffff;
    background-color: #4d3837;
    border-radius: 24px;
    width: 90vw;
    height: 48px;
    border: none;
    font-family: Montserrat;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;

    :hover {
      background-color: #392a29;
    }
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  width: 90vw;
  div {
    margin-left: 20px;
    padding-top: 4px;
    h2 {
      font-family: Montserrat;
      color: #222222;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: left;
    }
    h3 {
      font-family: Montserrat;
      color: #9b9b9b;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  img {
    width: 70px;
    background-color: #ffffff;
    border-radius: 50%;
  }
`;

const ProfileContainer = styled.div`
  padding-top: 80px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
