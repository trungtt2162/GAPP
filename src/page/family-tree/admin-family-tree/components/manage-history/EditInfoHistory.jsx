import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
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
    setvalue(v);
  };
  console.log(value);
  return (
  <div>
      <div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={value}
        modules={modules}
        formats={formats}
        bounds={".app"}
        style={{
            height:300
        }}
      />
   
    </div>
      <div style={{marginTop:50}}>
      <PrimaryButton title={"Lưu"} />
      </div>
  </div>
  );
};
export default EditInfoHistory;
