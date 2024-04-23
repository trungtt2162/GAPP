import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { handleError } from "../../ultils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import { authApi } from "../../api/auth.api";
import useAuthStore from "../../zustand/authStore";
import { genealogyApi } from "../../api/genealogy.api";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function RequestGele() {
  const classes = useStyles();
  const { user } = useAuthStore();
  const [id, setId] = useState("");
  const [listGene, setListGene] = useState([]);
  const onReqest = async () => {
    try {
      if(!user.Phone){
        toast.warning("Vui lòng cập nhật số điện thoại trước khi request");
        return;
      }
      const res = await genealogyApi.requestgele(id);
      if (res.data.StatusCode === 200) {
        toast.success("Request thành công");
      }
    } catch (error) {
      toast.error("Bạn đã ở trong gia phả này hoặc đã request từ trước");
      // handleError(error);
    }
  };
  const getListPublicgene = async () => {
    try {
      const res = await genealogyApi.getListGegePublic();
      if (res.data.StatusCode === 200) {
        setListGene(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListPublicgene();
  }, [id]);
  return (
    <form className={classes.form}>
      <h4 style={{ marginBottom: 20 }} className="bold">
        Request vào gia phả
      </h4>
      <FormControl>
        <InputLabel id="select-label">Gia phả</InputLabel>
        <Select
          style={{
            width: 500,
            marginRight: 20,
          }}
          labelId="select-label"
          id="select"
          value={id}
          onChange={(e) => setId(e.target.value)}
          label="Gia phả"
        >
          {listGene.map((i) => (
            <MenuItem value={i.Id}>{i.Name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        disabled={!id}
        onClick={() => onReqest()}
        variant="contained"
        color="primary"
      >
        Request
      </Button>
    </form>
  );
}

export default RequestGele;
