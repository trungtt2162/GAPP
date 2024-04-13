import React, { useEffect, useState } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button,Container ,Box} from '@mui/material';
import { toast } from "react-toastify";
import useAuthStore from '../../zustand/authStore';
import { genealogyApi } from '../../api/genealogy.api';
import { handleError } from '../../ultils/helper';
import Navbar from '../../components/layout/Navbar';

function AddGene() {
 const {currentIdGenealogy} = useAuthStore()
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    IsPublic: 'true',
    UserId:0
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


//   const getCurrentGene = async () => {
//     try {
//         const res = await genealogyApi.getCurrentGene(currentIdGenealogy)
//         if(res.data.StatusCode === 200){
//             setFormData(res.data.Data.Data[0])
//         }
//     } catch (error) {
//         handleError(error)
//     }
//   }
//   useEffect(() => {
//   if(currentIdGenealogy){
//     getCurrentGene()
//   }
//   },[currentIdGenealogy])

  //SAVE
  const onsave = async()=>{
    try {
        const res = await genealogyApi.createGene({...formData,IsPublic:formData.IsPublic === "true" ? true :false});
        if(res.data.StatusCode === 200){
         toast.success("Đã tạo",{
            autoClose:200,
            onClose:() => {
                window.location.href = '/';
            }
         })
        }
    } catch (error) {
        handleError(error)
    }
  }
  return (
 <div>
      <Navbar />
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
     <Container style={{marginTop:40}} maxWidth="md">
    <h4 className="bold">Tạo gia phả</h4>
      <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="Name"
        variant="outlined"
        value={formData.Name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
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
 </div>
  );
}

export default AddGene;