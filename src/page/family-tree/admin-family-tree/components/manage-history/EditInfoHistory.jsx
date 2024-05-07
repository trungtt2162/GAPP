import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { historyApi } from "../../../../../api/history.api";
import { handleError } from "../../../../../ultils/helper";
import useAuthStore from "../../../../../zustand/authStore";
import { toast } from "react-toastify";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const EditInfoHistory = () => {
  const [value, setvalue] = useState("");
  const handleChange = (v) => {
    setData({...data,Description:v});
  };
  const { userGenealogy,currentIdGenealogy } = useAuthStore();

  const [data, setData] = useState({
    IDGenealogy: 0,
    Image: "",
    Description: "",
    Id: 0,
  });

  const getDes = async (id) => {
    try {
      const res = await historyApi.getDescriptionHistorufamily(id);
      if (res.data.StatusCode === 200) {
        setData(res.data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onSave = async() => {
    try {
      console.log(data)
      const res = await historyApi.updateDescriptionHistorufamily({...data,IDGenealogy:currentIdGenealogy});
      if (res.data.StatusCode === 200) {
        toast.success("Lưu thành công")
      }
    } catch (error) {
      handleError(error);
    }
  };
  
  useEffect(() => {
    getDes(currentIdGenealogy);
  }, [currentIdGenealogy]);
  return (
    <div>
      <div>
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          value={data.Description}
          modules={modules}
          formats={formats}
          bounds={".app"}
          style={{
            height: 300,
          }}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <PrimaryButton event={() => onSave()} title={"Lưu"} />
      </div>
    </div>
  );
};
export default EditInfoHistory;
