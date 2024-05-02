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

import { useEffect, useState } from "react";
// import { postRegister } from '../../services/apiServices';
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { genderOptions } from "../../constant/common";
import { authApi } from "../../api/auth.api";
import { handleError,validatePhoneNumber,validateIDCard, validateAddress,validateBirthday } from "../../ultils/helper";
import useAuthStore from "../../zustand/authStore";

const Register = (props) => {
  const { login, logOutAction } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    FirstName: "",
    LastName: "",
    Password: "",
    Phone: "",
    Address: "",
    Gender: "",
    DateOfBirth: null,
    HomeTown: "",
    Indentification: "",
    Avatar: "string",
  });
const [repassword,setRePass] = useState("");
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
  const validateusername = () => {
    return String(formData.Username)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handlleRegister = async () => {
    if(formData.FirstName.trim()===""){
      toast.error("Vui lòng nhập họ.");
      return;
    }
    if(formData.LastName.trim() === "" ){
      toast.error("Vui lòng nhập tên.");
      return;
    }
    if (!validateusername()) {
      toast.error("Email sai định dạng");
      return;
    }
    if(formData.Password !== repassword){
      toast.error("Xác nhận mật khẩu không trùng khớp");
      return;
    }
    if(validatePhoneNumber(formData.Phone) ===false){
      toast.error("Định dạng điện thoại không chính xác. Yêu cầu 10 số");
      return;
    }
    if(validateIDCard(formData.Indentification)===false){
      toast.error("Định dạng CCCD không chính xác. Yêu cầu 9- 12 số");
      return;
    }
    if(validateAddress(formData.Address)===false){
      toast.error("Địa chỉ cần cụ thể hơn.");
      return;
    }

    if(validateAddress(formData.Address)===false){
      toast.error("Địa chỉ cần cụ thể hơn.");
      return;
    }
    if(formData.Gender===""){
      toast.error("Vui lòng chọn giới tính.");
      return;
    }
    if(validateBirthday(formData.DateOfBirth) === "" ){
      toast.error("Ngày sinh nhật không hợp lệ.");
      return;
    }
    if ( formData.DateOfBirth !== null){
      const selectedDate = new Date(formData.DateOfBirth);
      const currentDate = new Date();
      if (selectedDate >= currentDate) {
        toast.error("Ngày sinh không hợp lệ.");
        return;
      }
    }
    
    try {
      const res = await authApi.register({
        ...formData,
      });
      if (res.data.StatusCode === 200) {
        toast.success("Đăng ký thành công", {
          onClose: () => navigate("/login"),
          autoClose: 500,
        });
      }
      if (res.data.StatusCode === 400) {
        toast.error("Email đã tồn tại", {
          autoClose: 500,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  useEffect(() => {
    logOutAction(false);
  }, []);
  return (
    <div className="signup-container">
      <div
        style={{
          background: "rgb(70 21 17)",
          height: "120vh",
        }}
        className="content-left"
      >
        <div
          style={{
            color: "rgb(242, 184, 79)",
          }}
          className="title col-6 mx-auto"
        >
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
              color: "rgb(242, 184, 79)",
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
            color:"rgb(242, 184, 79)",

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

        <div
          style={{
            padding: 70,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="Username"
                  label="Email"
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="Password"
                  value={formData.Password}
                  type="password"
                  onChange={handleChange}
                  required
                />
                  </Grid>
                 <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  value={repassword}
                  type="password"
                  onChange={e => setRePass(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  // required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CMND/CCCD"
                  name="Indentification"
                  value={formData.Indentification}
                  onChange={handleChange}
                  // required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  // required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Gender"
                  select
                  label="Giới tính"
                  value={formData.Gender}
                  onChange={handleChange}
                  fullWidth
                  required
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
                  name="DateOfBirth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!formData.FirstName || !formData.LastName || formData.Gender === "" || !formData.Password || !formData.Username}
                  onClick={() => handlleRegister()}
                  variant="contained"
                  color="primary"
                >
                  Đăng ký
                </Button>
              </Grid>
            </Grid>
          </form>
          <div></div>
          <div
            style={{
              marginTop: 10,
            }}
            className="text-center"
          >
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
