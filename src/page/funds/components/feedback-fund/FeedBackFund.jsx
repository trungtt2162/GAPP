import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

function FeedBackFund() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        // Lấy ảnh từ sự kiện và lưu vào state
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // Lưu dữ liệu base64 vào state
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý việc gửi dữ liệu lên server (ví dụ: bằng cách sử dụng API)
        console.log("Tiêu đề:", title);
        console.log("Nội dung:", content);
        console.log("Ảnh:", image);
        // Gửi dữ liệu lên server ở đây...
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
            <h4 className='bold'>Góp ý</h4>
            <TextField
                label="Tiêu đề"
                fullWidth
                value={title}
                onChange={handleTitleChange}
                margin="normal"
            />
            <TextField
                label="Nội dung"
                fullWidth
                multiline
                rows={4}
                value={content}
                onChange={handleContentChange}
                margin="normal"
            />
            <input
                accept="image/*"
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                style={{
                    display:"none"
                }}
            />
            <div className='flex-start'>
                {image && <img style={{
                    width:100,
                    height:100,
                    objectFit:'contain',
                    marginBottom:10
                }} src={image} />}
            </div>
          <div style={{
            display:'flex',
            justifyContent:"flex-start",
            gap:20
          }}>
            
          <label htmlFor="image-upload">
                <Button variant="outlined" component="span">
                    Tải ảnh lên
                </Button>
            </label>
            <Button type="submit" variant="contained" color="primary">
                Gửi
            </Button>
          </div>
        </form>
        </Container>
    );
}

export default FeedBackFund;