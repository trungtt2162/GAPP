import { Button, Grid, MenuItem, TextField } from '@mui/material';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { authApi } from '../../api/auth.api';
import AddImage from '../../components/common/addImage/AddImage';
import { genderOptions2 } from '../../constant/common';
import { handleError } from '../../ultils/helper';
import useAuthStore from '../../zustand/authStore';

function Profile() {
  const {user,setUser} = useAuthStore();
  const [formData, setFormData] = useState({...user,DateOfBirth:user.DateOfBirth?moment(user.DateOfBirth).format("YYYY-MM-DD"):""});
  const fileRef = useRef();
  const [loading,setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async() => {
    try {
      setLoading(true)
      const res = await authApi.upadteinfoAdmin({...formData,TypeRole: "string",});
      if(res.data.StatusCode ===200){
        
        toast.success("Cập nhật thành công",{
          onClose:() => {
            setUser(formData)
          }
        });
       
      }
    } catch (error) {
      handleError(error)
    }finally{
      setLoading(false)
    }
  };
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const url = reader.result;
        setFormData({...formData,Avatar:url})
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    }; 

  return (
    <form>
        <h4 style={{marginBottom:20}} className="bold">Thông tin cá nhân</h4>
      <Grid container>
       <Grid item xs={8}>
       <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Họ"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Tên"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CCCD/CMND"
            name="Indentification"
            value={formData.Indentification}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa chỉ"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
        name="Gender"
        select
        label="Giới tính"
        value={formData.Gender}
        onChange={handleChange}
        fullWidth
      >
        {genderOptions2.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Ngày sinh nhật"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
           
        </Grid>
        <Grid item xs={12}>
          <Button disabled={loading} onClick={()=>handleSubmit()} type="submit" variant="contained" color="primary">
            Lưu thông tin
          </Button>
        </Grid>
      </Grid>
       </Grid>
       <Grid item xs={4}>
        <input onChange={handleFileChange} type ="file" ref={fileRef} style={{
            display:"none"
        }} />
             <AddImage click={() => fileRef.current.click()} url={formData.Avatar} />
       </Grid>
      </Grid>
    </form>
  );
}

export default Profile;