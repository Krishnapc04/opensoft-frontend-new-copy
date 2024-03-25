import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setToken } from '../../redux/actions';
import axios from 'axios';
import Styles from './Login.module.css';
import { toast } from 'react-toastify';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
const Login = () => {
  const navigate = useNavigate();
  const [text , setText] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();
  


  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    if (!password) {
      setPasswordValid(false);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      return;
    }

    try {
      const response = await axios.post('http://10.145.54.6:8080/register', {
        username: text,
        email: email,
        password: password
      });
      console.log(response.data);
      if(response.data.error===null)
      {
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/login');
      }
      else{
        toast.error(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.response.data.message,{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.holder}>
        <h1 className="text-white text-center mb-4">{isSigningUp ? 'Sign Up' : 'Sign In'}</h1>
        {!isSigningUp && <LoginForm/>}
        {isSigningUp && <SignupForm/>}
        <br />
        <br />
        <div className={Styles.login_form_other}>
          <div className={Styles.login_signup_now}>
            {isSigningUp ? 'Existing User' : 'New to flixpedia?'} &nbsp;
            <button className="" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? 'Sign In' : 'Sign up now'}
            </button>
            .
          </div>
        </div>
      </div>
      <div className={Styles.shadow}></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;
