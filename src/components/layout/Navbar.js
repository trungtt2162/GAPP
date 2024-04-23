import {
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  
} from "react-router-dom";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Menu, Close } from "@mui/icons-material";
import PrimaryButton from "../common/button/PrimaryButton";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
//import { default as logo } from "../../assets/logo.svg";
import { theme } from "../../theme";
import { USER_ROLE, listNoHero } from "../../constant/common";
import useAuthStore from "../../zustand/authStore";

const Navbar = () => {
  const { palette } = useTheme(theme);
  const navigate = useNavigate();

  const location  = useLocation();
  const isNotHero = listNoHero.includes(location.pathname) || listNoHero.some(i => location.pathname.includes(i))
  const [url, setUrl] = useState(null);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNotMobile = useMediaQuery("(min-width: 1200px)");
  const { isLogin, roleCode, user, logOutAction, isCreateGene ,currentIdGenealogy,listRole,selectGeneAction} =
    useAuthStore();

  const isAdmin =
    isLogin &&
    (roleCode === USER_ROLE.SiteAdmin || roleCode === USER_ROLE.PeopleAdmin);
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

    const handleChange = (e) => {
      selectGeneAction(e.target.value)

    }
  return (
    <Box
      position="absolute"
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: "1rem 3%",
        // background: isNotHome && "white",
        // borderBottom:"1px solid lightgray",
        boxShadow: isNotHome && `0 2px 4px 0 rgba(43,43,43,.1)`,
        color: !isNotHero ?"white" :"black !important"
      }}
    >
      <span
        onClick={() => {
          navigate("/");
        }}
        style={{
          fontSize: 30,
          fontWeight: "bold",
          cursor: "pointer",
          color:"rgb(242, 184, 79)"
          
        }}
      >
        GAPP
      </span>
      {/* DESKTOP NAVBAR */}
      {isNotMobile && (
        <>
          <Box >
            {/* <Link to="/" className={"link" + (url === "/" ? " active" : "")}>
              Event Guest
            </Link> */}
            {/* EMPTY FAKE LINKS */}
            {isLogin && (
              <Link to="/" className={"link" + (url === "/" ? " active" : "")}>
                Trang chủ
              </Link>
            )}
            {(isMember || !isLogin) && (
              <Link
                to="/pageTree"
                className={"link" + (url === "/pageTree" ? " active" : "")}
              >
               {isSiteAdmin ?"Quản lý gia phả" :"Gia phả"}
              </Link>
            )}
            {(isMember || !isLogin) && (
              <Link
                to="/history"
                className={"link" + (url === "/history" ? " active" : "")}
              >
                Lịch sử gia đình
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
            {isLogin && !isSiteAdmin && !isSupperAdmin && (
              <Link
                to="/request-event"
                className={"link" + (url === "/request-event" ? " active" : "")}
              >
                Yêu cầu sự kiện
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
                to="/fund"
                className={"link" + (url === "/fund" ? " active" : "")}
              >
                Quỹ
              </Link>
            )}
            {isSiteAdmin && (
              <Link
                to="/fund"
                className={"link" + (url === "/fund" ? " active" : "")}
              >
                Quản lý quỹ
              </Link>
            )}
            {isLogin && isCreateGene && !isSupperAdmin&& (
              <Link
                to="/create-gene"
                className={"link" + (url === "/create-gene" ? " active" : "")}
              >
                Tạo gia phả
              </Link>
            )}

            {/* <Link
              to="/#"
              className={"link" + (url === "/support" ? " active" : "")}
            >
              Support
            </Link> */}
          </Box>
          <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            // width:400
          }} display="flex" gap="1.5rem">
            {user && (
              <div
                onClick={() => navigate("/profile")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Avatar
                  sx={{ width: 25, height: 25 }}
                  src={user?.Avatar}
                ></Avatar>
                <span>{user?.FirstName + " " + user?.LastName}</span>
              </div>
            )}
            {!isSupperAdmin && listRole.length > 0 && <FormControl  variant="outlined">
              <InputLabel>Gia phả</InputLabel>
              <Select
              style={{width:150,height:45,color: !isNotHero && "rgb(242, 184, 79)",borderColor:"white"}}
                name="Gender"
                value={currentIdGenealogy}
                onChange={handleChange}
                label="Gia phả"
              >
                {listRole.map((i) => (
                      <MenuItem value={i.IdGenealogy}>{i.GenealogyName+" - " + i.RoleCode}</MenuItem>
                    ))}
              </Select>
            </FormControl>}
            {isLogin && (
              <PrimaryButton
                
                event={() => {
                  logOutAction(false);
                 
                  navigate("/login");
                }}
                title={"Đăng xuất"}
              >
                
              </PrimaryButton>
            )}
            {!isLogin && (
              <PrimaryButton
                title={"Đăng nhập"}
                event={() => {
                  navigate("/login");
                }}
              >
              
              </PrimaryButton>
            )}
            {!isLogin && (
              <PrimaryButton
              title={"Đăng kí"}
                event={() => {
                  navigate("/register");
                }}
              >
                
              </PrimaryButton>
            )}
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
                    // "&:hover": { color: palette.primary.main },
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
