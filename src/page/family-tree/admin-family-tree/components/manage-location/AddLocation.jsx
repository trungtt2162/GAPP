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

function AddLocationForm({item,onClose,updateNewItem}) {
  const {userGenealogy,currentIdGenealogy } = useAuthStore();

  const [locationData, setLocationData] = useState(item || {
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
  };

  const handleAdd = async() => {
   try {
    const res = !item ?  await addressApi.addAdress({
      ...locationData,
      IDGenealogy:currentIdGenealogy
    }) : await addressApi.updateAdress(locationData)
    if(res.data.StatusCode===200){
     toast.success(item? "Sửa thành công":"Thêm thành công")
    if(!item){
      setLocationData({
        IDGenealogy: "",
        Name: "",
        Location: "",
        Type: "",
        Id: "",
       })
      }
    }
    if(item){
      onClose();
      updateNewItem(locationData)
    }
  } catch (error) {
    handleError(error)
  }}

  return (
    <Container maxWidth="sm">
      <h4 style={{marginTop:10}} className="bold">{item ? "Sửa địa điểm" :"Thêm địa điểm"}</h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên địa điểm"
              variant="outlined"
              name="Name"
              value={locationData.Name}
              required
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
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại địa điểm</InputLabel>
              <Select
                name="Type"
                value={locationData.Type}
                required
                onChange={handleChange}
                label="Loại địa điểm"
              >
                {listLocation.map(i =>  <MenuItem value={i.id}>{i.value}</MenuItem>)}
              
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <ButtonLoading loading={loading} event={() => handleAdd()} title={item ? "Sửa địa điểm" :"Thêm địa điểm"} />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddLocationForm;
