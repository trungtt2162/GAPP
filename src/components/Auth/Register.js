import "./Register.scss";
// import signupBg from '../../assets/bg3.jpg';
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  MenuItem,
} from "@mui/material";

import { useState } from "react";
// import { postRegister } from '../../services/apiServices';
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { genderOptions } from "../../constant/common";
import { authApi } from "../../api/auth.api";
import { handleError } from "../../ultils/helper";

const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    indentification: "",
    phone: "",
    address: "",
    gender: "",
    dayOfBirth: "",
    image: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<VscEyeClosed />);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(<VscEyeClosed />);
      setType("text");
    } else {
      setIcon(<VscEye />);
      setType("password");
    }
  };
  // const validateusername = (username) => {
  //   return String(username)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };
  const handlleRegister = async () => {
    try {
      const res = await authApi.register({...formData,HomeTown:"111",Avatar:"111"});
      console.log(res)
    } catch (error) {
      handleError(error,true)
    }
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  return (
    <div className="signup-container">
      <div
        style={{
          height: "100vh",
        }}
        className="content-left"
      >
        <div className="title col-6 mx-auto">
          <span>Sign up</span>
          <br />
          <span>and come on in</span>
        </div>
        <div className="img-bg">
          {/* <img src={signupBg} height={280} width={350} /> */}
        </div>
        <div className="credit">
          <span
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            GAPP &#169;
          </span>
        </div>
      </div>
      <div className="content-right">
        <div className="header">
          <span>Bạn đã có tài khoản?</span>
          <button
            className="btn-signup"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
        <div
          className="title"
          style={{
            marginBottom: -50,
          }}
        >
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            GAPP
          </span>
        </div>

        <div style={{
            padding:70
        }}>
          <form onSubmit={handleSubmit}>
           
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Họ"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Tên"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="username"
                      label="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      name="password"
                      value={formData.password}
                      type="password"
                      onChange={handleChange}
                      />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="CMND/CCCD"
                      name="indentification"
                      value={formData.indentification}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="gender"
                      select
                      label="Giới tính"
                      value={formData.gender}
                      onChange={handleChange}
                      fullWidth
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Ngày sinh nhật"
                      name="dayOfBirth"
                      value={formData.dayOfBirth}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={() => handlleRegister()} variant="contained" color="primary">
                     Đăng ký
                    </Button>
                  </Grid>
                </Grid>
             
          </form>
          <div>
          
          </div>
          <div style={{
            marginTop:10
          }} className="text-center">
            <span
              className="back"
              onClick={() => {
                navigate("/");
              }}
            >
              &#60;&#60;Về trang chủ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
