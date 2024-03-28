import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
} from "@mui/material";
import AddImage from "../../../../../components/common/addImage/AddImage";

function AddMemberForm() {
  const [memberData, setMemberData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    idNumber: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    dateOfDeath: "",
    placeOfBirth: "",
    branch: "",
    image:""
  });
  const fileRef = useRef()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData({
      ...memberData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setMemberData({
        ...memberData,
        image: url,
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(memberData); // Thay console.log bằng xử lý submit thực tế ở đây
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  variant="outlined"
                  name="lastName"
                  value={memberData.lastName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tên"
                  variant="outlined"
                  name="firstName"
                  value={memberData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={memberData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CCCD/CMND"
                  variant="outlined"
                  name="idNumber"
                  value={memberData.idNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  name="phoneNumber"
                  value={memberData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  variant="outlined"
                  name="address"
                  value={memberData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    name="gender"
                    value={memberData.gender}
                    onChange={handleChange}
                    label="Giới tính"
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

             
            </Grid>
          </Grid>
          <Grid item xs={6}>
           
            <input
            ref={fileRef}
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
                onChange={handleImageChange}
            />
            <AddImage url={memberData.image} click={() =>fileRef.current.click() } />
           
           
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  variant="outlined"
                  type="date"
                  name="dateOfBirth"
                  value={memberData.dateOfBirth}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ngày mất"
                  variant="outlined"
                  type="date"
                  name="dateOfDeath"
                  value={memberData.dateOfDeath}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nơi sinh"
                  variant="outlined"
                  name="placeOfBirth"
                  value={memberData.placeOfBirth}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Chi/Nhánh/Phái/Đời"
                  variant="outlined"
                  name="branch"
                  value={memberData.branch}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
           
                <Button type="submit" variant="contained" color="primary">
                  Thêm Thành Viên
                </Button>
              </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddMemberForm;
