import React, { useRef, useState } from "react";

import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { eventApi } from "../../../../../api/event.api";
import AddImage from "../../../../../components/common/addImage/AddImage";
import { handleError, uploadImageToFirebase } from "../../../../../ultils/helper";
import useAuthStore from "../../../../../zustand/authStore";
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
  IsPublic:false
}
  const [formData, setFormData] = useState(
   item ?  {...item,OrganizationDate:moment(item?.OrganizationDate)?.format("YYYY-MM-DD")} : originData
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // SAVE
  const onSave = async() =>{
    try {
      const data = { ...formData, IDGenealogy: userGenealogy[0]?.IdGenealogy,IsPublic:formData.IsPublic ==="true" ?true:false };
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
                
           {formData.Type ==0 &&  <TextField
              label="Link stream"
              value={formData.LinkStream}
              onChange={handleChangeData("LinkStream")}
              multiline
              fullWidth
              required
            />}
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
                  Bảo mật
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
                    label="Public"
                  />
                </RadioGroup>
              </FormControl>
            </div>
           

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
