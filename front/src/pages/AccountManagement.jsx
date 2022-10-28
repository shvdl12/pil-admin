import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import Paper from '@mui/material/Paper';
import Title from '../layout/Title'
import _axios from '../axios'
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import CreateAccountDialog from '../dialog/CreateAccount';
import UpdateAccountDialog from '../dialog/UpdateAccount';

const AccountManagement = () => {

  const [accounts, setAccounts] = React.useState([]);
  const [selected, setSelected] = React.useState({id: null, name: null, grade: null});
  const [openCreateAccount, setOpenCreateAccount] = React.useState(false);
  const [openUpdateAccount, setOpenUpdateAccount] = React.useState(false);
  const userChecker = useSelector(state => state.auth.user);

  useEffect(() => {
    fetchAccountAll()
  }, []);

  const fetchAccountAll = () => {
    _axios.get('/account/detail/all').then((res => {
      if(res.data.code === 200) {
        setAccounts(res.data.result)
      }
    }))
  }

  const handleClickDeleteAccount = (id) => {

    if(id === userChecker.id) {
      alert('자신의 계정은 삭제할 수 없습니다.')
    }
    else if(window.confirm('정말 삭제하시겠습니까?')) {
      _axios.post('/account/delete', {id: id}).then((res) => {
        alert(res.data.message)
        fetchAccountAll()
      })
    }
  }

  const handleClickCreateAccount = () => {
    setOpenCreateAccount(true)
  };

  const handleClickUpdateAccount = (account) => {
    setSelected(account)
    setOpenUpdateAccount(true)
  };

  const handleClickPasswordReset = (id) => {
    if(id === userChecker.id) {
      alert('자신의 계정은 초기화할 수 없습니다.')
    }
    else if(window.confirm('정말 초기화하시겠습니까?')) {
      _axios.post('/account/update/password', {
        id: id,
        password: 'eoqnwndro1!'
      }).then((res) => {
        if(res.status === 200) {
          alert('초기화되었습니다.')
          fetchAccountAll()
        }
      })
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f5f5f5'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
  <Box>

    <Title title='계정 관리' />

    <Grid container justifyContent="flex-start">
      
      <CreateAccountDialog open={openCreateAccount} setOpen={setOpenCreateAccount} refresh={fetchAccountAll} />
      <UpdateAccountDialog open={openUpdateAccount} setOpen={setOpenUpdateAccount} refresh={fetchAccountAll}
          selected={selected} setSelected={setSelected} />

      <Grid item lg={12} md={12}>
        <Button sx={{marginBottom: 1}} onClick={handleClickCreateAccount}> 계정 추가 </Button>
      </Grid>
      
      <Grid item lg={8} md={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell> 아이디 </StyledTableCell>
                <StyledTableCell> 이름 </StyledTableCell>
                <StyledTableCell> 권한 </StyledTableCell>
                <StyledTableCell> 생성 날짜 </StyledTableCell>
                {
                userChecker.grade === 'master' &&
                <StyledTableCell align='center'> 권한 변경 </StyledTableCell>
                }
                <StyledTableCell align='center'> 비밀번호 초기화 </StyledTableCell>
                <StyledTableCell align='center'> 삭제 </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell> {account.id} </TableCell>
                <TableCell> {account.name} </TableCell>
                <TableCell>{account.grade}</TableCell>
                <TableCell>{account.createdAt}</TableCell>
                {
                userChecker.grade === 'master' &&
                <TableCell align='center'>
                  <IconButton> 
                    <EditIcon onClick={()=> {handleClickUpdateAccount(account)}}/>
                  </IconButton>
                </TableCell>
                }
                <TableCell align='center'>
                  <IconButton>
                    <VpnKeyIcon onClick={()=> {handleClickPasswordReset(account.id)}}/>
                  </IconButton>
                </TableCell>
                <TableCell align='center'>
                  <IconButton>
                    <DeleteIcon onClick={()=> {handleClickDeleteAccount(account.id)}}/>
                  </IconButton>
                </TableCell>

              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  </Box>
  );
}


export default AccountManagement;
