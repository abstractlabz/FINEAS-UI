import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignInComponent = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Check for user information in cookies on component mount
        const savedProfile = Cookies.get('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json',
                },
            })
            .then((res) => {
                setProfile(res.data);
                // Save user information as a cookie
                Cookies.set('userProfile', JSON.stringify(res.data), { expires: 7 }); // Expires in 7 days
            })
            .catch((err) => console.log(err));
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
        Cookies.remove('userProfile'); // Remove the cookie on logout
    };

    return (
        <>
            {profile ? (
                <div className="flex items-center">
                    <img src={profile.picture} alt="user image" className="w-12 h-12 rounded-full mr-2 border-4 border-white"/>
                    <button onClick={logOut} className="text-black bg-white py-2 px-4 rounded-full hover:bg-gray-100">Log out</button>
                </div>
            ) : (
                <button onClick={() => login()} className="text-black bg-white py-2 px-4 rounded-full hover:bg-gray-100">Sign in with Google 🚀 </button>
            )}
        </>
    );
};

export default SignInComponent;
