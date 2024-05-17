import React, { useRef, useState } from "react";
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
  Container,
} from "@mui/material";
import AddImage from "../../../components/common/addImage/AddImage";
import { genderOptions } from "../../../constant/common";
import ButtonLoading from "../../../components/common/button/ButtonLoading";
import { handleError } from "../../../ultils/helper";
import { supperAdminApi } from "../../../api/supperAdmin.api";
import { toast } from "react-toastify";

function AddAccount() {
  const originData = {
    Id: 0,
    ModifiedBy: "string",
    ModifiedDate: "2024-04-02T16:00:23.634Z",
    CreatedBy: "string",
    CreatedDate: "2024-04-02T16:00:23.634Z",
    firstName: "",
    lastName: "",
    email: "",
    indentification: "",
    phone: "",
    address: "",
    gender: 0,
    dateOfBirth: "",
    dateOfDeath: "2024-04-02T16:00:23.634Z",
    avatar: "string",
    Type: 0,
    HomeTown: "a",
    InActive: false,
    IsBlock: false,
    Name: "a",
    Description: "string",
    TypeRole: "string",
    JobTitle: "",
    IsMartyrs: false,
  };
  const [formData, setFormData] = useState(originData);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await supperAdminApi.createAdmin({
        ...formData,
        gender: formData.gender == true ? 1 : 0,
      });
      console.log(res.data);
      if (res.data.StatusCode === 200) {
        toast.success("Thêm thành công");
        setFormData(originData);
      }
      setLoading(false);
    } catch (error) {
      handleError(error, true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
            required
              fullWidth
              label="Họ"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             required
              fullWidth
              label="Tên"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             required
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              value={formData.password}
              type="password"
              onChange={handleChange}
            />
          </Grid> */}
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nghề nghiệp"
              variant="outlined"
              name="JobTitle"
              value={formData.JobTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             required
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
              required
              type="date"
              label="Ngày sinh nhật"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonLoading
              title={" Thêm tài khoản"}
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              event={() => handleSubmit()}
            ></ButtonLoading>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

export default AddAccount;
