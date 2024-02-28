// import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
// import { postLogin } from '../../services/apiServices';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { doLogin } from '../../redux/action/userAction';
import { ImSpinner6 } from 'react-icons/im'
import Hero from '../Page/ui/Hero';
const Login = (props) => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(false);

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    // const handlleLogin = async () => {
    //     //validate
    //     const isValidateEmail = validateEmail(email);
    //     if (!isValidateEmail) {
    //         toast.error('Invalid Email !!!')
    //         return;
    //     }
    //     if (!password) {
    //         toast.error('Invalid Password !!!')
    //         return;
    //     }
    //     setIsLoading(true);
    //submit
    // let res = await postLogin(email, password);
    // if (res && +res.EC === 0) {
    //     dispatch(doLogin(res));
    //     toast.success(res.EM);
    //     setIsLoading(false);
    //     navigate('/');
    // }
    // if (res && +res.EC !== 0) {
    //     toast.error(res.EM);
    //     setIsLoading(false);
    // }
    // }
    return (
        <div className="login-container">
           
            <div className='header' >
                
            </div>
            <div className='title col-3 mx-auto' >
                <span onClick={() => { navigate('/') }}>GAPP</span>
            </div>
            <div className='welcome col-3 mx-auto'>
                Chào mừng bạn trở lại!
            </div>
            <div className='content-form col-3 mx-auto'>
                <div className='form-group'>
                    <label>
                        Email
                    </label>
                    <input
                        type={"email"}
                        className='form-control'
                        placeholder='tntt21@gmail.com'
                    // value={email}
                    // onChange={(event) => setEmail(event.target.value)} 
                    />
                </div>
                <div className='form-group'>
                    <label>
                        Password
                    </label>
                    <input
                        type={"password"}
                        className='form-control'
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot your password?</span>
                <div >
                    <button
                        className='btn-submit'
                    // onClick={() => handlleLogin()}
                    // disabled={isLoading}
                    >
                        {/* {isLoading === true && <ImSpinner6 className='loaderIcon' />} */}
                        <span> Login in to TNTT21</span>

                    </button>
                </div>
                <div className='text-center'>
                    <span>Don't have an account yet?</span>
                    <button className="btn-signup" onClick={() => { navigate('/signup') }}>
                        Sign up
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Login;