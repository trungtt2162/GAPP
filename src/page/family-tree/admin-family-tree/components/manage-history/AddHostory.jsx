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
import {
  handleError,
  uploadImageToFirebase,
} from "../../../../../ultils/helper";
import { historyApi } from "../../../../../api/history.api";
import { toast } from "react-toastify";
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
function AddHistory({ item, updateItem }) {
  const classes = useStyles();
  const { userGenealogy } = useAuthStore();

  const fileRef = useRef();
  const [formData, setFormData] = useState(
    item || {
      IDGenealogy: "",
      Image: "",
      Description: "",
      Id: 0,
      Date: "",
      IdFamilyHistory: 0,
      Type: 0,
      Title: "",
    }
  );

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const url = await uploadImageToFirebase(file);
    setFormData({ ...formData, Image: url });
  };

  const handleAdd = async () => {
    try {
      const data = { ...formData, IDGenealogy: userGenealogy[0]?.IdGenealogy };
      const res = !item
        ? await historyApi.addHistory(data)
        : await historyApi.updateHistory(data);
      if (res.data.StatusCode === 200) {
        toast.success(item ? "Cập nhât thành công" : "Thêm thành công");
        if (!item) {
          setFormData({
            IDGenealogy: "",
            Image: "",
            Description: "",
            Id: 0,
            Date: "",
            IdFamilyHistory: 0,
            Type: 0,
            Title: "",
          });
        } else {
          updateItem(data);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container maxWidth="md">
      <h4 className="bold">{!item ? "Thêm lịch sử" : "Sửa lịch sử"}</h4>
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
        }}
        container
        spacing={1}
      >
        <Grid item xs={8}>
          <form className={classes.form}>
          <TextField
              multiline
              rows={1}
              label="Tiêu đề"
              value={formData.Title}
              onChange={(e) =>
                setFormData({ ...formData, Title: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Ngày diễn ra"
              type="date"
              value={formData.Date}
              onChange={e =>setFormData({ ...formData, Date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              
            />
            <TextField
              multiline
              rows={4}
              label="Mô tả"
              value={formData.Description}
              onChange={(e) =>
                setFormData({ ...formData, Description: e.target.value })
              }
              fullWidth
              required
            />

            <Button
            disabled={!formData.Description || !formData.Title || !formData.Date}
              onClick={() => handleAdd()}
              variant="contained"
              color="primary"
            >
              {item ? "Sửa" : "Tạo"}
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
            width={item && 150}
            height={item && 150}
            click={() => fileRef.current.click()}
            url={formData.Image}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddHistory;
