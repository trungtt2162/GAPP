import {
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Menu, Close } from "@mui/icons-material";
import PrimaryButton from "../common/button/PrimaryButton";
//import { default as logo } from "../../assets/logo.svg";
import { theme } from "../../theme";
import { USER_ROLE } from "../../constant/common";
import useAuthStore from "../../zustand/authStore";

const Navbar = () => {
  const { palette } = useTheme(theme);
  const navigate = useNavigate();

  const location = useLocation();
  const [url, setUrl] = useState(null);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNotMobile = useMediaQuery("(min-width: 1200px)");
  const { isLogin, roleCode,user ,logOutAction} = useAuthStore();

  const isAdmin = isLogin && (roleCode === USER_ROLE.SiteAdmin || roleCode === USER_ROLE.PeopleAdmin);
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isAdmin;
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const isNotHome =
    location.pathname !== "/" && !location.pathname.includes("home");
  return (
    <Box
      position="absolute"
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: "1rem 3%",
        background: isNotHome && "white",
        // borderBottom:"1px solid lightgray",
        boxShadow: isNotHome && `0 2px 4px 0 rgba(43,43,43,.1)`,
      }}
    >
      <span
      onClick = {() => {
        navigate("/")
      }}
        style={{
          fontSize: 30,
          fontWeight: "bold",
          cursor:"pointer"
        }}
      >
        GAPP
      </span>
      {/* DESKTOP NAVBAR */}
      {isNotMobile && (
        <>
          <Box>
          {/* <Link to="/" className={"link" + (url === "/" ? " active" : "")}>
              Event Guest
            </Link> */}
            {/* EMPTY FAKE LINKS */}
          {isLogin &&   <Link to="/" className={"link" + (url === "/" ? " active" : "")}>
              Home
            </Link>}
            {(isMember ||!isLogin)&& (
                <Link
                  to="/pageTree"
                  className={"link" + (url === "/pageTree" ? " active" : "")}
                >
                   Gia Phả
                </Link>
              )}
            {(isMember || !isLogin)&& (
              <Link
                to="/history"
                className={"link" + (url === "/history" ? " active" : "")}
              >
                Lịch Sử Gia Đình
              </Link>
            )}
            {isSupperAdmin && (
              <Link
                to="/admin"
                className={"link" + (url === "/admin" ? " active" : "")}
              >
                Quản lý admin
              </Link>
            )}
            {(isMember || !isLogin) && (
              <Link
                to="/event"
                className={"link" + (url === "/event" ? " active" : "")}
              >
                Sự kiện
              </Link>
            )}
            {isMember && (
              <Link
                to="/request-event"
                className={"link" + (url === "/request-event" ? " active" : "")}
              >
                Request Sự kiện
              </Link>
            )}
            {/* <Link
              to="/#"
              className={"link" + (url === "/locations" ? " active" : "")}
            >
              Locations
            </Link> */}
            {(isUser || isPeopleAdmin) && (
              <Link
                to="/member-fund"
                className={"link" + (url === "/member-fund" ? " active" : "")}
              >
               Quỹ
              </Link>
            )}
            {isSiteAdmin && (
              <Link
                to="/admin-fund"
                className={"link" + (url === "/admin-fund" ? " active" : "")}
              >
                Quản lý quỹ
              </Link>
            )}
            
            {/* <Link
              to="/#"
              className={"link" + (url === "/support" ? " active" : "")}
            >
              Support
            </Link> */}
          </Box>
          <Box display="flex" gap="1.5rem">
           {
            user &&  <div onClick={() => navigate("/profile")} style={{
              cursor:"pointer",
              display:"flex",
              justifyContent:'center',
              alignItems:'center',
              gap:10
            }}>
            <Avatar sx={{ width: 25,height:25}} src={user?.Avatar}></Avatar>
            <span>{user?.FirstName + " " + user?.LastName}</span>
            </div>
           }
           {isLogin &&  <Button

              variant="contained"
              sx={{
                p: ".5rem 1.5rem",
                color: "white",
                           }}
              onClick={() => {
                logOutAction(false)
                
                navigate("/login");
              }}
            >
              Đăng xuất
            </Button>}
           {!isLogin &&  <Button
             variant="text"
             sx={{
               p: ".5rem 1.5rem",
               backgroundColor: palette.primary.main,
               color: "#ffffff",
               borderRadius: 2,
               boxShadow: ` 0px 7px 5px 0px ${palette.primary.light}}`,
               "&:hover": { color: palette.primary.main },
             }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </Button>}
           {!isLogin &&  <Button
              variant="text"
              sx={{
                p: ".5rem 1.5rem",
                backgroundColor: palette.primary.main,
                color: "#ffffff",
                borderRadius: 2,
                boxShadow: ` 0px 7px 5px 0px ${palette.primary.light}}`,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng kí
            </Button>}
          </Box>
        </>
      )}

      {!isNotMobile && (
        <>
          <IconButton
            onClick={() => {
              setIsMobileMenuToggled(!isMobileMenuToggled);
            }}
          >
            <Menu />
          </IconButton>
          {/* MOBILE NAVBAR BODY */}
          {isMobileMenuToggled && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="300px"
              sx={{
                backgroundColor: "#fff",
              }}
            >
              {/* CLOSE ICON */}
              <Box display="flex" justifyContent="flex-end" p="2rem">
                <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>

              {/* MENU ITEMS */}
              <Box
                p="3rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  to="/"
                  className={"link" + (url === "/" ? " active" : "")}
                >
                  Home
                </Link>
                <Link
                  to="/pageTree"
                  className={"link" + (url === "/pageTree" ? " active" : "")}
                >
                  Cây Gia Phả
                </Link>
                <Link
                  to="/history"
                  className={"link" + (url === "/history" ? " active" : "")}
                >
                  Lịch Sử Gia Đình
                </Link>
                <Link
                  to="/locations"
                  className={"link" + (url === "/locations" ? " active" : "")}
                >
                  Locations
                </Link>
                <Link
                  to="/support"
                  className={"link" + (url === "/support" ? " active" : "")}
                >
                  Support
                </Link>
                <Button
                  variant="text"
                  sx={{
                    p: ".5rem 1.5rem",
                    color: palette.text.secondary,
                    backgroundColor: "transparent",
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Signin
                </Button>
                <PrimaryButton title="Register" />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Navbar;
