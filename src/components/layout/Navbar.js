import {
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Popover,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Menu, Close } from "@mui/icons-material";
import PrimaryButton from "../common/button/PrimaryButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
import { toast } from "react-toastify";
import { dateFormat3, handleError } from "../../ultils/helper";
import { notiApi } from "../../api/noti.api";

const Navbar = () => {
  const [anchor, setAnchor] = useState(false);
  const [anchorNoti, setAnchorNoti] = useState(false);


  const open = Boolean(anchor);
  const openNoti = Boolean(anchorNoti);


  const id = open ? "open-profile" : undefined;
  const idNoti = open ? "open-noti" : undefined;


  const { palette } = useTheme(theme);
  const navigate = useNavigate();

  const location = useLocation();
  const isNotHero =
    listNoHero.includes(location.pathname) ||
    listNoHero.some((i) => location.pathname.includes(i));
  const [url, setUrl] = useState(null);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNotMobile = useMediaQuery("(min-width: 1200px)");
  const {
    isLogin,
    roleCode,
    user,
    logOutAction,
    isCreateGene,
    currentIdGenealogy,
    listRole,
    selectGeneAction,
    listNoti,
    setListNoti
  } = useAuthStore();


  const isAdmin =
    isLogin &&
    (roleCode === USER_ROLE.SiteAdmin || roleCode === USER_ROLE.PeopleAdmin);
  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isAdmin;
  const numberNoti = listNoti?.filter(i => !i.IsViewed)?.length || 0
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const isNotHome =
    location.pathname !== "/" && !location.pathname.includes("home");

  const handleChange = (e) => {
    selectGeneAction(e.target.value);
  };

  ///
  const arrayPopup = [
    {
      name: "Thông tin cá nhân",
      onClick: () => navigate("/profile"),
      show: isLogin,
    },
    {
      show: isLogin && isCreateGene && !isSupperAdmin,
      name: "Tạo gia phả",
      onClick: () => navigate("/create-gene"),
    },
    {
      show: isLogin && !isSupperAdmin,
      name: "Yêu cầu vào gia phả",
      onClick: () => navigate("/request-gene"),
    },
    {
      name: "Đăng xuất",

      onClick: () => {
        toast.dismiss();
        logOutAction(false);

        navigate("/login");
      },
      show: isLogin,
    },
  ];

  // render
  const renderListPopup = () => {
    return (
      <div>
        {arrayPopup
          .filter((i) => i.show)
          .map((item) => (
            <div
              className="bg-hover"
              style={{
                padding: 10,
                cursor: "pointer",
                borderBottom: "1px solid lightgray",
                "&:hover": {
                  background: "lightgray",
                },
              }}
              onClick={() => {
                item.onClick();
                setAnchor(null);
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    );
  };


  const messNoti = (type,data) => {
  const dt = JSON.parse(data.RawData)
    switch(type){
      case "Member_Request_Genealogy":{
        return "đã yêu cầu vào gia phả"
      }
      case "Admin_Approve_Genealogy":{
        return "đã đồng ý cho bạn vào gia phả " + dt.GenealogyName
      }
      case "Admin_Reject_Genealogy":{
        return "đã từ chối cho bạn vào gia phả " + dt.GenealogyName
      }
      default:{
        return ""
      }
    }
  }
  // list Noti
  const renderListNoti = () => {
    if(listNoti.length === 0){
      return <div className="noti empty-noti">
        Không có thông báo nào
      </div>
    }
    else return <div className="noti">
      {
        listNoti.map(item => {
          return <div className="noti-item">
          <span className="bold" style={{color:""}}>{item.SenderName}</span> {" " + messNoti(item.Type,item)} 
          <div style={{
            color:"gray",
            textAlign:'end',
            fontSize:12
          }}>{dateFormat3(item.CreatedDate)}</div>
        </div>
        })
      }
    </div>
  }
  const handleViewed = async() => {
    try {
      const listNotView = listNoti.filter(i => !i.IsViewed).map(i => i.Id + "").join(";")
     
      await notiApi.viewNoti(listNotView + ";999")
      setListNoti(listNoti.map(i => ({...i,IsViewed:true})))
    } catch (error) {
      
    }
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
        color: !isNotHero ? "white" : "black !important",
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
          color: "rgb(242, 184, 79)",
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
                {isSiteAdmin ? "Quản lý gia phả" : "Gia phả"}
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // width:400
            }}
            display="flex"
            gap="1.5rem"
          >
            {!isSupperAdmin && listRole.length > 0 && (
              <FormControl variant="outlined">
                <InputLabel>Gia phả</InputLabel>
                <Select
                  style={{
                    width: 150,
                    height: 45,
                    color: !isNotHero && "rgb(242, 184, 79)",
                    borderColor: "white",
                  }}
                  name="Gender"
                  value={currentIdGenealogy}
                  onChange={handleChange}
                  label="Gia phả"
                >
                  {listRole.map((i) => (
                    <MenuItem value={i.IdGenealogy}>
                      {i.GenealogyName + " - " + i.RoleCode}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {user && (
              <>
                <div
                  onClick={(event) => setAnchor(event.currentTarget)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Avatar
                    aria-describedby={id}
                    sx={{ width: 25, height: 25 }}
                    src={user?.Avatar}
                  ></Avatar>
                  <span>{user?.FirstName + " " + user?.LastName}</span>
                </div>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchor}
                  onClose={() => setAnchor(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div>
                    <div>{renderListPopup()}</div>
                  </div>
                </Popover>
              </>
            )}
            {isMember && (
              <div style={{cursor:"pointer"}}>
                <NotificationsIcon
                onClick={(event) => {
                  setAnchorNoti(event.currentTarget)
                  handleViewed()
                }}
                aria-describedby={idNoti}
                  style={{
                    position: "relative",
                    cursor:"pointer"
                  }}
                />
               {numberNoti !==0 &&  <div className="noti-number">{numberNoti}</div>}
                <Popover
                  id={idNoti}
                  open={openNoti}
                  anchorEl={anchorNoti}
                  onClose={() => setAnchorNoti(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                    
                  }}
                >
                  <div>
                    <div>{renderListNoti()}</div>
                  </div>
                </Popover>
              </div>
            )}

            {/* {isLogin && (
              <PrimaryButton
                event={() => {
                  logOutAction(false);

                  navigate("/login");
                }}
                title={"Đăng xuất"}
              ></PrimaryButton>
            )} */}
            {!isLogin && (
              <PrimaryButton
                title={"Đăng nhập"}
                event={() => {
                  navigate("/login");
                }}
              ></PrimaryButton>
            )}
            {!isLogin && (
              <PrimaryButton
                title={"Đăng kí"}
                event={() => {
                  navigate("/register");
                }}
              ></PrimaryButton>
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
