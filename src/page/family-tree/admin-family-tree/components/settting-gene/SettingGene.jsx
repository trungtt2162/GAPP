import React, { useEffect, useState } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button,Container } from '@mui/material';
import useAuthStore from '../../../../../zustand/authStore';
import { handleError } from '../../../../../ultils/helper';
import { genealogyApi } from '../../../../../api/genealogy.api';
import { toast } from "react-toastify";

function SettingGene() {
 const {currentIdGenealogy,setGeneName} = useAuthStore()
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    IsPublic: 'true',
  });


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Submit your form data here
  };


  const getCurrentGene = async () => {
    try {
        const res = await genealogyApi.getCurrentGene(currentIdGenealogy)
        if(res.data.StatusCode === 200){
            setFormData(res.data.Data.Data[0])
        }
    } catch (error) {
        handleError(error)
    }
  }
  useEffect(() => {
  if(currentIdGenealogy){
    getCurrentGene()
  }
  },[currentIdGenealogy])

  //SAVE
  const onsave = async()=>{
    try {
        const res = await genealogyApi.updateCurrentGene({...formData,IsPublic:formData.IsPublic === "true" ? true :false});
        if(res.data.StatusCode === 200){
         toast.success("Đã cập nhật",{
          onClose:() =>   setGeneName(formData.Name),
          autoClose:200
         })
       
        }
    } catch (error) {
        handleError(error)
    }
  }
  return (
  <Container maxWidth="md">
    <h4 className="bold">Cài đặt gia phả</h4>
      <form onSubmit={handleSubmit}>
      <TextField
      required
        label="Tên gia phả"
        name="Name"
        variant="outlined"
        value={formData.Name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mô tả ngắn về gia phả"
        name="Description"
        variant="outlined"
        value={formData.Description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <div style={{display:"flex",justifyContent:"flex-start"}}>
      <FormControl component="fieldset" margin="normal">
        <FormLabel style={{
            textAlign:"start"
        }} component="legend">Trạng thái</FormLabel>
        <RadioGroup row name="IsPublic" value={formData.IsPublic} onChange={handleChange}>
          <FormControlLabel value={true} control={<Radio />} label="Public" />
          <FormControlLabel value={false} control={<Radio />} label="Private" />
        </RadioGroup>
      </FormControl>
      </div>
      <Button onClick={() => onsave()} variant="contained" color="primary" style={{ marginTop: 20 }}>
        Lưu
      </Button>
    </form>
  </Container>
  );
}

export default SettingGene;