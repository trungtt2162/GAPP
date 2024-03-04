import './Register.scss'
// import signupBg from '../../assets/bg3.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VscEyeClosed />);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<VscEyeClosed />);
            setType('text')
        } else {
            setIcon(<VscEye />)
            setType('password')
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handlleRegister = async () => {
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('Invalid Email !!!')
            return;
        }
        if (!password) {
            toast.error('Invalid Password !!!')
            return;
        }
        // let res = await postRegister(email, username, password);
        // if (res && +res.EC === 0) {
        //     toast.success(res.EM);
        //     navigate('/login');
        // }
        // if (res && +res.EC !== 0) {
        //     toast.error(res.EM);
        // }
    }
    return (
        <div className="signup-container">
            <div className="content-left">
                <div className='title col-6 mx-auto'>
                    <span>
                        Sign up
                    </span>
                    <br />
                    <span>
                        and come on in
                    </span>
                </div>
                <div className='img-bg' >
                    {/* <img src={signupBg} height={280} width={350} /> */}
                </div>
                <div className='credit'>
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        GAPP &#169;
                    </span>
                </div>
            </div>
            <div className="content-right">
                <div className='header' >
                    <span>Don't have an account yet?</span>
                    <button className="btn-signup" onClick={() => { navigate('/login') }}>
                        Login
                    </button >
                </div>
                <div className='title col-3 mx-auto'>
                    <span onClick={() => { navigate('/') }}>GAPP</span>
                </div>
                <div className='welcome col-8 mx-auto'>
                    Get better data with conversational forms, surveys, quizzes & more.
                </div>
                <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <input
                            type={"phone"}
                            className='form-control'
                            placeholder='Phone Number'
                        // value={email}
                        // onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type={"email"}
                            className='form-control'
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type={"username"}
                            className='form-control'
                            placeholder='Username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='form-group pass-group'>
                        <input
                            type={type}
                            className='form-control'
                            placeholder='Password'
                            value={password}
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span onClick={handleToggle} className="eyeicon">
                            {icon}
                        </span>
                    </div>

                    <div >
                        <button
                            className='btn-submit'
                            onClick={() => handlleRegister()}
                        >Create my free account</button>
                    </div>
                    <div className='text-center'>
                        <span className='back' onClick={() => { navigate('/') }}>
                            &#60;&#60; Go to Homepage</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;