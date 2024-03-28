import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    margin: 'auto',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function ChangePasswordForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện kiểm tra và xử lý mật khẩu ở đây
    console.log(formData); // In ra để kiểm tra dữ liệu form đã nhập
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
         <h4 style={{marginBottom:20}} className="bold">Đổi mật khẩu</h4>
      <TextField
        name="currentPassword"
        label="Mật khẩu hiện tại"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="newPassword"
        label="Mật khẩu mới"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="confirmPassword"
        label="Xác nhận mật khẩu mới"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Đổi mật khẩu
      </Button>
    </form>
  );
}

export default ChangePasswordForm;