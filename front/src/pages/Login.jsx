import * as React from 'react';

import Grid from '@mui/material/Grid';
import styled from '@mui/system/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducer/auth";

const Root = styled(Grid) ({
  height: '50vh',  
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const LoginGrid = styled(Grid) ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
});

const LoginPaper = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const Logo = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(0),
  backgroundColor: '#9C27B0'
}));

const Btn = styled(Button)(({ theme}) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
}));


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://pilloan.com/">
        PIL 대부중개
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
  
const Login = () => {

  const [account, setAccount] = React.useState({ userId: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userChecker = useSelector(state => state.auth.user);

  const handelAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);
  };

  const handelLogin = () => {
    
    
  axios.post('/account/login', account).then((res) => {
      if(res.data.code === 200) {
        dispatch(login({
          token: res.data.token,
          isAdmin: res.data.isAdmin === 'Y' ? true : false
        }))
        console.log(userChecker)
        navigate('/main')

      }else {
        alert(res.data.message)
      }
    })
  };

  return (
    <Root container >
      <LoginGrid xs={12}>
        <LoginPaper>
          <Logo>
            <LockOutlinedIcon/> 
          </Logo>
          
          <Typography sx={{ marginTop: 1, marginBottom: 1 }} component="h1" variant="h6">
            PIL Admin 
          </Typography>

          <form>
            <TextField
              onChange={(event) => handelAccount("userId", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userId"
              label="아이디"
              name="userId"
              autoFocus
            />

            <TextField
              onChange={(event) => handelAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />

          </form>

          <Btn
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handelLogin}
            >
             로그인 </Btn>

          
          <Copyright></Copyright>
        </LoginPaper>
      </LoginGrid>
      
    </Root>
  );
}


export default Login;
