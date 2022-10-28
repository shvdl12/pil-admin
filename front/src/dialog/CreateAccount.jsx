import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import _axios from '../axios'

const CreateAccountDialog = (props) => {

  const [account, setAccount] = React.useState({id: null, name: null});
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleCreateAccount = () => {
    _axios.post('/account/create', account).then((res) => {
        if(res.data.code === 200) {
            alert('추가되었습니다.')
            props.refresh()
            handleClose()
        }else {
            alert(res.data.message)
        }
    })
  } 

  const handleChange = (prop) => (event) => {
    setAccount({ ...account, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>계정 추가</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange("name")}
            autoFocus
            margin="dense"
            id="name"
            label="이름"
            fullWidth
            variant="standard"
          />
           <TextField
            onChange={handleChange("id")}
            autoFocus
            margin="dense"
            id="id"
            label="아이디"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleCreateAccount}>추가</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CreateAccountDialog;