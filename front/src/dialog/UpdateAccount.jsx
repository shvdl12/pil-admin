import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import { useSelector } from "react-redux";
import _axios from '../axios'

const UpdateAccountDialog = (props) => {

  const userChecker = useSelector(state => state.auth.user)
  const getgradeList = () => {
    const grade = userChecker.grade
    const gradeList = ['basic']

    if(grade === 'admin' || grade === 'master') {
      gradeList.push('admin')
    }
    if(grade === 'master') {
      gradeList.push('master')
    }

    return gradeList
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleUpdateAccount = () => {
    console.log(props.selected)
    _axios.post('/account/update/grade', props.selected).then((res) => {
        if(res.data.code === 200) {
            alert('수정되었습니다')
            props.refresh()
            handleClose()
        }else {
            alert(res.data.message)
        }
    })
  } 

  const handleChange = (prop) => (event) => {
    console.log(props)
    props.setSelected({ ...props.selected, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>권한 변경</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="이름"
            fullWidth
            variant="standard"
            disabled
            defaultValue={props.selected.name}
          />
           <TextField
            autoFocus
            margin="dense"
            id="id"
            label="아이디"
            fullWidth
            variant="standard"
            disabled
            defaultValue={props.selected.id}
          />
           <TextField
            onChange={handleChange('grade')}
            autoFocus
            margin="dense"
            id="grade"
            label="권한"
            fullWidth
            variant="standard"
            select
            value={props.selected.grade}
          >
             {getgradeList().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleUpdateAccount}>저장</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default UpdateAccountDialog;