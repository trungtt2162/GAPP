import { useEffect, useRef, useState } from "react";
import { uploafFileBase64 } from "../../../../../ultils/helper";
import { Button, Grid, TextField } from "@mui/material";

const HisoryEventItem = ({ image, description, setHistory, id }) => {
  const [txtDes, setTxtDes] = useState(description);
  const [imageUrl, setImageUrl] = useState(image);
  const [modeEdit, setModeEdit] = useState(false);
  const fileRef = useRef();
  const onChangeImage = (e) => {
    const base64 = uploafFileBase64(e,setImageUrl);
  };
  useEffect(() => {
    setHistory(id, {
      description: txtDes,
      image: imageUrl,
    });
  }, [imageUrl, setImageUrl]);
  return (
    <div
      style={{
        marginTop: 10,
      }}
      className="flex-center"
    >
      <input ref={fileRef} style={{ display: "none" }} type="file" onChange={onChangeImage} />
      <Grid container spacing={3}>
        <Grid xs={2} item>
            
          <div
          onClick={() => fileRef.current.click()}
            style={{
              width: "100%",
              height: 100,
              background: `url(${imageUrl})`,
              backgroundSize:"contain",
              cursor:"pointer"
            }}
            className="border"
          ></div>
        </Grid>
        <Grid xs={6} item>
          {!modeEdit ? (
            <p style={{
                textAlign:"start"
            }} className="flex-start">{txtDes}</p>
          ) : (
            <div className="flex-start">
              <TextField
              style={{
                width:"100%"
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
              onClick={() => setModeEdit(true)}
              style={{
                marginRight: 10,
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
              }}
              variant="contained"
              color="success"
            >
              Ok
            </Button>
          )}
          <Button variant="contained" color="error">
            Xóa
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default HisoryEventItem;
