import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import { eventApi } from "../../../../../api/event.api";
import useAuthStore from "../../../../../zustand/authStore";
import {
  dateFormat,
  dateFormat2,
  handleError,
  uploadImageToFirebase,
} from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import AddImage from "../../../../../components/common/addImage/AddImage";
import { list } from "firebase/storage";
import InfoIconButton from "../../../../../components/common/InfoIcon";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
    width: "100%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function AddEvent({ item, updateItem }) {
  const classes = useStyles();
  const fileRef = useRef();
  const { userGenealogy, currentIdGenealogy, user } = useAuthStore();
  const [limitMeber, setLimitMember] = useState(false);
  const [listMember, setlistMember] = useState([]);
  const [listUserAttend, setListUserAttend] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const originData = {
    IdGenealogy: 26,
    Name: "",
    Description: "",
    LinkStream: "",
    Type: 0,
    Background: "",
    OrganizationDate: "",
    Location: "",
    UserIDHost: 0,
    IsPublic: true,
    InActive: false,
    UserEvents: [],
  };
  const [formData, setFormData] = useState(item || originData);

  const handleChangeData = (key) => (e) => {
    const newValue = e?.target?.value;
    setFormData({ ...formData, [key]: newValue });
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const url = await uploadImageToFirebase(file);
    setFormData({ ...formData, Background: url });
  };
  const handleUserSelection = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // get List member
  const getListMember = async () => {
    try {
      const res = await genealogyApi.getListUserFromGenealogy(
        currentIdGenealogy
      );
      if (res.data.StatusCode === 200) {
        setlistMember(
          res?.data?.Data?.Data?.filter((i) => i.UserId != user.Id)
        );
      }
    } catch (error) {
      handleError(error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    getListMember();
  }, [currentIdGenealogy]);
  // SAVE
  const onSave = async () => {
    try {
      if(formData.Name.trim()===""){
        toast.error("Vui lòng nhập tên sự kiện.");
      }
      if(formData.Description.trim()===""){
        toast.error("Vui lòng nhập mô tả sự kiện.");
      }
      if(formData.OrganizationDate===""){
        toast.error("Vui lòng nhập ngày sự kiện.");
      }
      if(formData.Location===""){
        toast.error("Vui lòng nhập ngày sự kiện.");
      }
      const data = {
        ...formData,
        IDGenealogy: currentIdGenealogy,
        IsPublic: formData.IsPublic === "true" ? true : false,
        UserEvents:
          limitMeber == "true"
            ? listMember.filter((i) => i.checked)
            : listMember,
      };
      const res = !item
        ? await eventApi.adminRequestEvent(data)
        : await eventApi.updateEvent(data);
      if (res.data.StatusCode === 200) {
        toast.success(item ? "Cập nhât thành công" : "Tạo thành công");
        if (!item) {
          setFormData(originData);
        } else {
          const listFinal =
            limitMeber == "true"
              ? listMember.filter((i) => i.checked)
              : listMember;
          const listAdd = getListAdd(listUserAttend, listFinal);
          const lisDelete = getListDelete(listUserAttend, listFinal);
          if (listAdd.length > 0) {
            await eventApi.addListNewUserEvent(
              listAdd.map((i) => ({
                IdGenealogy: i.IdGenealogy,
                UserID: i.UserId,
                IdEvent: item.Id,
                FirstName: i.FirstName,
                LastName: i.LastName,
                Email: i.Email,
                Id: i.Id,
              }))
            );
          }
          if (lisDelete.length > 0) {
            lisDelete.forEach((item) => {
              eventApi.deleteUserEvent(item.Id, item.IdGenealogy);
            });
          }
          updateItem(data);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  // get list user attend
  const getListUserAttend = async (idgene, idevent) => {
    try {
      const res = await eventApi.getListUserAttendEvent(idgene, idevent);
      if (res.data.StatusCode === 200) {
        setListUserAttend(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (item) {
      getListUserAttend(item.IdGenealogy, item.Id);
    }
  }, [item]);

  useEffect(() => {
    if (listUserAttend.length > 0 && item && listMember.length > 0) {
      const listUserid = listUserAttend.map((i) => i.UserID + "");
      const newListMem = listMember.map((item) => {
        if (listUserid.includes(item.UserId + "")) {
          item.checked = true;
        }
        return item;
      });

      setlistMember(newListMem);
    }
  }, [listUserAttend, item]);

  useEffect(() => {
    if (item) {
      if (listMember.length === listUserAttend.length) {
        setLimitMember("false");
      } else {
        setLimitMember("true");
      }
    }
  }, [item, listUserAttend]);

  //List Add
  const getListAdd = (listAttendOrigin, listFinal) => {
    const listOriginUserId = listAttendOrigin.map((i) => i.UserID + "");

    return listFinal.filter((i) => !listOriginUserId.includes(i.UserId + ""));
  };
  // ListDelete
  const getListDelete = (listAttendOrigin, listFinal) => {
    const listFinalid = listFinal.map((i) => i.UserId + "");
    return listAttendOrigin.filter((i) => !listFinalid.includes(i.UserID + ""));
  };

  return (
    <div>
      <Container maxWidth="md">
        <h4 style={{ marginTop: 30 }} className="bold">
          {!item ? "Tạo sự kiện" : "Cập nhật sự kiện"}
        </h4>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Tên sự kiện"
                value={formData.Name}
                onChange={handleChangeData("Name")}
                fullWidth
                required
              />
              <TextField
                label="Mô tả sự kiện"
                value={formData.Description}
                onChange={handleChangeData("Description")}
                multiline
                fullWidth
                required
              />
              <TextField
                label="Thời gian tổ chức"
                type="datetime-local"
                value={formData.OrganizationDate}
                onChange={handleChangeData("OrganizationDate")}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                inputProps={{
                  min: "1900-01-01T00:00", // Ngày và giờ tối thiểu
                  max: "2100-12-31T23:59", // Ngày và giờ tối đa
                  step: 3600, // Bước thời gian là 1 giờ
                }}
              />
              <TextField
                label="Địa điểm"
                type="text"
                value={formData.Location}
                onChange={handleChangeData("Location")}
                fullWidth
                required
              />

              <div
                style={{
                  width: "100%",
                }}
                className="flex-start"
              >
                <FormControl component="fieldset">
                  <FormLabel
                    style={{
                      textAlign: "start",
                    }}
                    component="legend"
                  >
                    Hình thức tổ chức
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.Type}
                    onChange={handleChangeData("Type")}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Online"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Offline"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {formData.Type == 0 && (
                <TextField
                  label="Link stream"
                  value={formData.LinkStream}
                  onChange={handleChangeData("LinkStream")}
                  multiline
                  fullWidth
                  required
                />
              )}
              <div
                style={{
                  width: "100%",
                }}
                className="flex-start"
              >
                <FormControl component="fieldset">
                  <FormLabel
                    style={{
                      textAlign: "start",
                    }}
                    component="legend"
                  >
                    Chế độ hiển thị
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.IsPublic}
                    onChange={handleChangeData("IsPublic")}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Private"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span> Public </span>
                          <InfoIconButton infoText="Chế độ công khai sẽ hiển thị công khai với những người dùng bên ngoài gia phả" />
                        </div>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  width: "100%",
                }}
                className="flex-start"
              >
                <FormControl component="fieldset">
                  <FormLabel
                    style={{
                      textAlign: "start",
                    }}
                    component="legend"
                  >
                    Người tham gia
                  </FormLabel>
                  <RadioGroup
                    row
                    value={limitMeber}
                    onChange={(e) => setLimitMember(e.target.value)}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Cho phép tất cả tham gia"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Thêm người tham gia"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {limitMeber == "true" && (
                <TableContainer
                  style={{ width: "150%", marginLeft: "50%" }}
                  component={Paper}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Chọn</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Ngày Sinh</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Địa Chỉ</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        {/* {isSiteAdmin && <TableCell>Quyền</TableCell>} */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listMember
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                <Checkbox
                                  onChange={(e) => {
                                    const list = [...listMember];
                                    list[index].checked = e.target.checked;
                                    setlistMember(list);
                                  }}
                                  checked={user.checked == true}
                                />
                              </TableCell>
                              <TableCell>
                                {user?.FirstName + " " + user?.LastName}
                              </TableCell>
                              <TableCell>
                                {dateFormat(user.DateOfBirth)}
                              </TableCell>
                              <TableCell>{user.Email}</TableCell>
                              <TableCell>{user.Address}</TableCell>
                              <TableCell>
                                {user.Gender === 0 ? "Nam" : "Nữ"}
                              </TableCell>
                              {/*  */}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {limitMeber == "true" && (
                <TablePagination
                  component="div"
                  count={listMember?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              )}
              <Button
                onClick={() => onSave()}
                variant="contained"
                color="primary"
              >
                {!item ? "Tạo sự kiện" : "Cập nhật sự kiện"}
              </Button>
            </form>
          </Grid>
          <Grid item xs={4}>
            <input
              onChange={handleChangeFile}
              type="file"
              style={{
                display: "none",
              }}
              ref={fileRef}
            />
            <AddImage
              click={() => fileRef.current.click()}
              url={formData.Background}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddEvent;
