import { useEffect, useRef, useState } from "react";
import {
  dateFormat,
  handleError,
  uploafFileBase64,
} from "../../../../../ultils/helper";
import { Button, Card, Grid, TextField, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { historyApi } from "../../../../../api/history.api";

const HisoryEventItem = ({
  Image,
  Description,
  setHistory,
  Id,
  setListHistory,
  listHistory,
  IDGenealogy,
  curr,
  setCurrentItem,
  Date,
  Title,
}) => {
  const [txtDes, setTxtDes] = useState(Description);
  const [imageUrl, setImageUrl] = useState(Image);
  const [modeEdit, setModeEdit] = useState(false);
  const fileRef = useRef();
  const onChangeImage = (e) => {
    const base64 = uploafFileBase64(e, setImageUrl);
  };
  useEffect(() => {
    setHistory(Id, {
      Description: txtDes,
      Image: imageUrl,
    });
  }, [imageUrl, setImageUrl]);

  const deleteHistory = async () => {
    try {
      const res = await historyApi.deleteHistory(Id, IDGenealogy);
      if (res.data.StatusCode === 200) {
        toast.success("Xóa thành công");
        setListHistory(listHistory.filter((i) => i.Id != Id));
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Card
      style={{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        padding: 10,
      }}
    >
      <input
        ref={fileRef}
        style={{ display: "none" }}
        type="file"
        onChange={onChangeImage}
      />
      <Grid container spacing={3}>
        <Grid xs={2} item>
          <Avatar src={Image} sx={{ width: 80, height: 80 }}></Avatar>
        </Grid>
        <Grid xs={6} item>
          {!modeEdit ? (
            <div>
              <div
                style={{
                  textAlign: "start",
                  fontSize: 20,
                }}
                className="flex-start bold"
              >
                {Title}
              </div>
              <div
                style={{
                  textAlign: "start",
                }}
              >
                {dateFormat(Date)}
              </div>
            </div>
          ) : (
            <div className="flex-start">
              <TextField
                style={{
                  width: "100%",
                }}
                value={txtDes}
                onChange={(e) => {
                  setTxtDes(e.target.value);
                }}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={3}>
          {!modeEdit && (
            <Button
              onClick={() => setCurrentItem(curr)}
              style={{
                marginRight: 10,
                marginTop: 30,
              }}
              variant="contained"
              color="success"
            >
              Sửa
            </Button>
          )}
          {modeEdit && (
            <Button
              onClick={() => setModeEdit(false)}
              style={{
                marginRight: 10,
                marginTop: 30,
              }}
              variant="contained"
              color="success"
            >
              Ok
            </Button>
          )}
          <Button
            onClick={() => deleteHistory()}
            style={{
              marginRight: 10,
              marginTop: 30,
            }}
            variant="contained"
            color="error"
          >
            Xóa
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
export default HisoryEventItem;
