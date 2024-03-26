import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setToken } from '../../../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import Styles from '../Login.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const dispatch = useDispatch();

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordValid(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ctaClickHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    if (!password) {
      setPasswordValid(false);
      return;
    }

    try {
      const response = await axios.post('http://10.145.54.6:8080/login', {
        email: email,
        password: password
      });
      if(response.data.data.token){
        dispatch(loginSuccess(response.data.data.user_data));
        dispatch(setToken(response.data.data.token));
        localStorage.setItem("token",response.data.data.token);
        toast.success('Login Successful',{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response.data.message,{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch(loginFailure(error.response.data.message));
    }
  };

  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };


  return (
    <div>
      <form>
        <input
          className={`form-control mb-0 ${Styles.loginemail}`}
          value={email}
          onChange={emailOnChangeHandler}
          type="email"
          placeholder="Email"
        />
        {!emailValid && (
          <p className="m-0 p-1 text-danger">Email is invalid/blank</p>
        )}
        <div className="input-group mt-3">
          <input
            className={`form-control ${Styles.loginpwd}`}
            value={password}
            onChange={passwordOnChangeHandler}
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
          />
          <div className="input-group-append">
            <button className={`btn btn-outline-secondary ${Styles.passwordVisibilityBtn}`} type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {!passwordValid && (
          <p className="text-danger p-1 mb-0">Password is invalid/blank</p>
        )}
        <button className="btn btn-danger w-100 mt-4" onClick={ctaClickHandler}>
          Sign In
        </button>
        <br />
      </form>
    </div>
  );
};

export default LoginForm;
