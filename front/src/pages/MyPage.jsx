import * as React from 'react';
import { Container, Grid, Box, TextField, Typography, Button, Divider } from '@mui/material';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../layout/Title'
import axios from 'axios'

const MyPage = () => {

  const [userDetail, setUserDetail] = React.useState({ id: "test", name: "test", password: "........" });
  
  useEffect(() => {
    //TODO 
    //Fetch user detail
  }, []);

  const handelUserDetail = (property, event) => {
    const _userDetail = { ...userDetail };
    _userDetail[property] = event.target.value;

    setUserDetail(_userDetail);
  };

  const handelChangePassword = () => {
    console.log(userDetail)
  };

  return (
  <Box>
    
    <Title title='내 정보 수정'/>
    
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