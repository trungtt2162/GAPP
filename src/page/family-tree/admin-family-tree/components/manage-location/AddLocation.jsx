import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Grid,
} from "@mui/material";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { listLocation } from "../../../../../constant/common";
import ButtonLoading from "../../../../../components/common/button/ButtonLoading";
import useAuthStore from "../../../../../zustand/authStore";
import { addressApi } from "../../../../../api/address.api";
import { toast } from "react-toastify";
import { handleError } from "../../../../../ultils/helper";

function AddLocationForm() {
  const {userGenealogy } = useAuthStore();

  const [locationData, setLocationData] = useState({
    IDGenealogy: 0,
    Name: "",
    Location: "",
    Type: "",
    Id: 0,
  });
  const [loading,setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(locationData); // Thay console.log bằng xử lý submit thực tế ở đây
  };

  const handleAdd = async() => {

   try {
    const res = await addressApi.addAdress({
      ...locationData,
      IDGenealogy:userGenealogy[0]?.IdGenealogy
    })
    if(res.data.StatusCode===200){
     toast.success("Thêm thành công")
     setLocationData({
      IDGenealogy: "",
      Name: "",
      Location: "",
      Type: "",
      Id: "",
     })
    }
  } catch (error) {
    handleError(error)
  }}

  return (
    <Container maxWidth="sm">
      <h4 className="bold">Thêm địa điểm</h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên địa điểm"
              variant="outlined"
              name="Name"
              value={locationData.Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vị trí"
              variant="outlined"
              name="Location"
              value={locationData.Location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại địa điểm</InputLabel>
              <Select
                name="Type"
                value={locationData.Type}
                onChange={handleChange}
                label="Loại địa điểm"
              >
                {listLocation.map(i =>  <MenuItem value={i.id}>{i.value}</MenuItem>)}
              
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <ButtonLoading loading={loading} event={() => handleAdd()} title={"Thêm địa điểm"} />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddLocationForm;
