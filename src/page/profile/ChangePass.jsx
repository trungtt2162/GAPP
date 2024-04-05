import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { handleError } from "../../ultils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { authApi } from "../../api/auth.api";
import useAuthStore from "../../zustand/authStore";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function ChangePasswordForm() {
  const classes = useStyles();
  const {user} = useAuthStore();
  const [formData, setFormData] = useState({
    UserName: "string",
    Password: "",
    PasswordNew: "",
    ConfirmPasswordNew: "",
  });

  const changePass  =async() => {
    try {
      if(formData.ConfirmPasswordNew !== formData.PasswordNew){
        toast.error("Confirm password không trùng khớp")
        return;
      }
      const res = await authApi.changePass({
        ...formData,
        UserName:user?.Email
      })
      if(res.data.StatusCode === 200){
        toast.success("Đổi mật khẩu thành công");
        setFormData({
          UserName: "string",
          Password: "",
          PasswordNew: "",
          ConfirmPasswordNew: "",
        })
      }
    } catch (error) {
      handleError(error)
    }
  }

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
      <h4 style={{ marginBottom: 20 }} className="bold">
        Đổi mật khẩu
      </h4>
      <TextField
        name="Password"
        label="Mật khẩu hiện tại"
        type="password"
        value={formData.Password}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="PasswordNew"
        label="Mật khẩu mới"
        type="password"
        value={formData.PasswordNew}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="ConfirmPasswordNew"
        label="Xác nhận mật khẩu mới"
        type="password"
        value={formData.ConfirmPasswordNew}
        onChange={handleChange}
        fullWidth
      />
      <Button onClick={() => changePass()} variant="contained" color="primary">
        Đổi mật khẩu
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
