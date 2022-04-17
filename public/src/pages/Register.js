import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import Logo from '../assets/logo.svg';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, [navigate])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        let flag = 1;
        if (password !== confirmPassword) {
            toast.error("Password mismatch!", toastOptions);
            flag = 0;
        }
        if (username.length < 3) {
            toast.error("Username should be minimum 3 characters!", toastOptions);
            flag = 0;
        }
        if (password.length < 8) {
            toast.error("Password length should be minimum 8 characters!", toastOptions);
            flag = 0;
        }
        if (email === "") {
            toast.error("Email is required!", toastOptions);
            flag = 0;
        }

        if (flag === 1)
            return true;
        return false;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username: username.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt="Snappy" />
                        <h1>snappy</h1>
                    </div>
                    <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create user</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
}


const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            color: #fff;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #fff;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button {
            background-color: #997af0;
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 0.4rem;
            font-weight: bold;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            text-transform: uppercase;
            transition: 0.2s ease-in-out;

            &:hover {
                background-color: #4e0eff;
            }
        }

        span {
            color: #fff;
            text-transform: uppercase;

            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Register;


