import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Navbar from "./components/Page/Navbar";
import Footer from "./components/Page/footer";

import App from './App';
import { ToastContainer } from 'react-toastify';
import Login from './components/Auth/Login';
import DashBoard from './components/Auth/DashBoard';
const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger' role='alert'>
            404 - Not found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Routes>
                    <Route path="/" element={<App />} >  
                        <Route path="users" element={<></>} />
                    </Route>
                    <Route path="/quiz/:id" element={<></>} />
                    <Route path="/admin" element={<></>} >
                        <Route index element={<DashBoard />} />
                        <Route path="" element={<></>} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Footer />
            </ThemeProvider>
        </div>
    );

}
export default Layout;