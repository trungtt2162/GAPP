import React, { useRef, useState } from "react";

import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddImage from "../../../../../components/common/addImage/AddImage";
import useAuthStore from "../../../../../zustand/authStore";
import { eventApi } from "../../../../../api/event.api";
import { handleError, uploadImageToFirebase } from "../../../../../ultils/helper";
import { toast } from "react-toastify";
import moment from "moment/moment";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    width: "100%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));
function AddEventForm({ item,updateItem }) {
  console.log(item)
  const classes = useStyles();
  const fileRef = useRef();
  const { userGenealogy } = useAuthStore();

const originData = {
  IdGenealogy: 0,
  Name: "",
  Description: "",
  LinkStream: "",
  Type: 0,
  Background: "",
  OrganizationDate: "",
  Location: "",
  UserIDHost: 0,
}
  const [formData, setFormData] = useState(
    {...item,OrganizationDate:moment(item?.OrganizationDate)?.format("YYYY-MM-DD")} || originData
  );

  const handleChangeData = key => e => {
    const newValue = e?.target?.value;
    setFormData({...formData,[key]:newValue})
  }

  const handleChangeFile = async(event) => {
    const file = event.target.files[0];
    const url = await uploadImageToFirebase(file);
    setFormData({...formData,Background:url});
   
  };
  const handleUserSelection = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // SAVE
  const onSave = async() =>{
    try {
      const data = { ...formData, IDGenealogy: userGenealogy[0]?.IdGenealogy };
      const res = !item
        ? await eventApi.addEvent(data)
        : await eventApi.updateEvent(data);
      if (res.data.StatusCode === 200) {
        toast.success(item ? "Cập nhât thành công" : "Thêm thành công");
        if (!item) {
          setFormData(originData);
        } else {
          updateItem(data);
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <Container maxWidth="md">
      <h4 className="bold">{item ?"Sửa sự kiên" :"Thêm sự kiện"}</h4>
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
              label="Ngày tổ chức"
              type="date"
              value={formData.OrganizationDate}
              onChange={handleChangeData("OrganizationDate")}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
              <TextField
              label="Địa điểm"
              type="text"
              value={formData.Location}
              onChange={handleChangeData("Location")}
              fullWidth
              required
            />
            {/* <TextField
              label="Ngày đóng"
              type="date"
              value={eventDateClose}
              onChange={(e) => setEventDateClose(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            /> */}
            <TextField
              label="Link stream"
              value={formData.LinkStream}
              onChange={handleChangeData("LinkStream")}
              multiline
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
                  Chế độ
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
            {/* <div
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
                  Chế độ
                </FormLabel>
                <RadioGroup
                  row
                  value={eventType}
                  onChange={(e) => setPrivateOrpublic(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </FormControl>
            </div> */}
            {/* <div
              style={{
                width: "150%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "50%",
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên</TableCell>
                      <TableCell>Ngày sinh</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Địa chỉ</TableCell>
                      <TableCell>Giới tính</TableCell>
                      <TableCell>Tham gia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: 5 }, (_, index) => (
                      <TableRow key={index}>
                        <TableCell>User {index + 1}</TableCell>
                        <TableCell>01/01/1990</TableCell>
                        <TableCell>user{index + 1}@example.com</TableCell>
                        <TableCell>123 Street, City</TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(index)}
                            onChange={() => handleUserSelection(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div> */}

            <Button onClick={() => onSave()} variant="contained" color="primary">
              {item ?"Cập nhật":"Tạo"}
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
          <AddImage click={() => fileRef.current.click()} url={formData.Background} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddEventForm;
