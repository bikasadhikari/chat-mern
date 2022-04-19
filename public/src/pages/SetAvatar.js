import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';


const SetAvatar = () => {

    const multiavatarApi = `https://api.multiavatar.com/45678945?apikey=${process.env.REACT_APP_MULTIAVATAR_API_KEY}`;

    const navigate = useNavigate();

    return (
        <>
        <Container>
            
        </Container>
        </>
    );
}

const Container = styled.div``;

export default SetAvatar;

