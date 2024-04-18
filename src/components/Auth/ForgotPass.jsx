import { useNavigate } from "react-router-dom";
import "./Login.scss";
import useAuthStore from "../../zustand/authStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../ultils/helper";
import { authApi } from "../../api/auth.api";
const ForgotPass = (props) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { login, logOutAction } = useAuthStore();

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

    try {
      const res = await authApi.forgotPass({
        Email: email,
      });
      toast.success("Đã gửi mật khẩu mới về email", {
        onClose: () => navigate("/login"),
        autoClose: 500,
      });
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    logOutAction(false);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(70 21 17)",
        height: "100vh",
      }}
      className="login-container"
    >
      <div className="title col-3 mx-auto">
        <span
         style={{
          color:"rgb(242, 184, 79)"
        }}
          onClick={() => {
            navigate("/");
          }}
        >
          GAPP
        </span>
      </div>
      <div
        style={{
          color: "rgb(242, 184, 79)",
        }}
        className="welcome col-3 mx-auto"
      >
        Nhập email để lấy lại mật khẩu!
      </div>
      <div
        style={{
          width: 550,
          background: "#fff",
          padding: 30,
          borderRadius: 20,
        }}
        className="content-form col-3 mx-auto"
      >
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

        <div>
          <button
            className="btn-submit"
            onClick={() => handlleLogin()}
            disabled={isLoading}
            style={{
              background: "rgb(242, 184, 79)",
              border: "none",
            }}
          >
            {/* {isLoading === true && <ImSpinner6 className='loaderIcon' />} */}
            <span> Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
