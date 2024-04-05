import { useNavigate } from "react-router-dom";
import "./Login.scss";
import useAuthStore from "../../zustand/authStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../ultils/helper";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { login,logOutAction } = useAuthStore();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handlleLogin = async () => {
    //validate
    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
        toast.error("Invalid Email !!!");
      return;
    }
    if (!password) {
        toast.error("Invalid Password !!!");
      return;
    }
   try {
   await login({
        userName:email,
        password,
      });
      navigate("/")
   } catch (error) {
    handleError(error)
    console.log("Loi login")
   }
  };
 useEffect(() => {
  logOutAction(false)
 },[])
  return (
    <div className="login-container">
      <div className="header">
        <span>Bạn chưa có tài khoản?</span>
        <button
          className="btn-signup"
          onClick={() => {
            navigate("/register");
          }}
        >
          Đăng ký
        </button>
      </div>
      <div className="title col-3 mx-auto">
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          GAPP
        </span>
      </div>
      <div className="welcome col-3 mx-auto">Chào mừng bạn trở lại!</div>
      <div className="content-form col-3 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder="Password"
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Quên mật khẩu?</span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handlleLogin()}
            disabled={isLoading}
          >
            {/* {isLoading === true && <ImSpinner6 className='loaderIcon' />} */}
            <span> Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
