import * as React from 'react';
import { Grid, Box, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../layout/Title'
import _axios from '../axios'

const MyPage = () => {

  const [userDetail, setUserDetail] = React.useState({ id: "", name: "", password: "" });
  const userChecker = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    //TODO 
    //Fetch user detail
    fetchUserDetail()
  }, []);

  const fetchUserDetail = () => {
    _axios.get('/account/detail').then((res => {
      if(res.data.code === 200) {
        setUserDetail(res.data.result)
      }
    }))
  }

  const handelUserDetail = (property, event) => {
    const _userDetail = { ...userDetail };
    _userDetail[property] = event.target.value;

    setUserDetail(_userDetail);
  };

  const handelChangePassword = () => {
    console.log(userDetail)
    _axios.post('/account/update/password', {id: userChecker.id, password: userDetail.password}).then((res) => {
      if(res.status === 200) {
        alert('변경되었습니다.\n다시 로그인해주세요.')
        navigate('/')
      }
    })
  };

  return (
  <Box>
    
    <Title title='내 정보'/>
    
    <Grid container justifyContent="flex-start">
      <Grid item lg={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableRow>
              <TableCell sx={{backgroundColor: '#f5f5f5'}} variant="head">아이디</TableCell>
              <TableCell>{userDetail.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{backgroundColor: '#f5f5f5'}} variant="head">이름</TableCell>
              <TableCell>{userDetail.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{backgroundColor: '#f5f5f5'}} variant="head">비밀번호</TableCell>
              <TableCell>
                <TextField
                 size="small"
                type={"password"}
                onChange={(event) => handelUserDetail("password", event)}
                defaultValue='..........'
                >

                </TextField>
                <Button
                  sx={{marginLeft: 2}}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handelChangePassword}>
                  변경
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  </Box>
  );
}


export default MyPage;