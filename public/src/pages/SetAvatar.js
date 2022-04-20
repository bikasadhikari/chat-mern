import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIRoutes';


const SetAvatar = () => {

    const multiavatarApi = `https://api.multiavatar.com/`;
    const apiKey = 'API_KEY';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const toastOptions = {
        position: 'top-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === null) {
            toast.error("Please select an avatar!", toastOptions);
            return;
        }
    }

    useEffect(() => {
        (async() => {
            const data = [];
            for (let i=0; i<4; i++) {
                const image = await axios.get(`${multiavatarApi}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
            setAvatars(data);
            setLoading(false);
        })();
    }, [])

    return (
        <>
        {
            isLoading ? <Container>
                <img src={loader} alt="Loading" />
            </Container>
            :
            (
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                </div>
                            );
                        })
                    }
                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
            )}
            <ToastContainer />
        </>
        
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: #fff;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.5s ease-in-out;
            cursor: pointer;
            img {
                height: 6rem;
            }
        }

        .selected {
            border: 0.4rem solid #4e0eff;
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
`;

export default SetAvatar;

