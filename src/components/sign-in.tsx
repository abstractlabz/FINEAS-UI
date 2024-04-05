"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import crypto from 'crypto';
import router, { useRouter } from 'next/router';

// Define a type for the user profile
interface UserProfile {
    picture: string;
    id_hash: string;
    stripe_customer_id: string;
    email: string;
    credits: number;
    is_member: boolean;
    
    // Add other user profile fields as needed
}

const SignInComponent = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const savedProfile = Cookies.get('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile) as UserProfile);
        }
    }, []);


    const refreshPage = () => {
        window.location.reload();
      };
      

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json',
                },
            })
            .then((res: any) => {
                if (res.data && res.data.email) {
                const id_hash_val = crypto.createHash('sha256').update(res.data.email).digest('hex');
                axios.get(`http://62.3.50.146:5600/get-user-info?id_hash=${id_hash_val}`).then((res) => {
                    const picture_val = res.data.picture;
                    const stripe_customer_id_val = '';
                    const email_val = res.data.email;
                    //make an axios call to the backend to get the user profile
                    axios.get(`http://62.3.50.146:5600/get-user-info?id_hash=${id_hash_val}`).then((res) => {
                    console.log(res.data['user'].id_hash)
                    const userProfile: UserProfile = {
                            picture: picture_val,
                            id_hash: id_hash_val,
                            stripe_customer_id: stripe_customer_id_val,
                            email: email_val,
                            credits: res.data['user'].credits,
                            is_member: res.data['user'].is_member,
                            // Initialize other fields as necessary
                    };
                    console.log(userProfile);
                    setProfile(userProfile);
                    Cookies.set('userProfile', JSON.stringify(userProfile), { expires: 7 });
                    refreshPage();
                    })
                })}
            })
            .catch((err) => console.log(err));
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
        Cookies.remove('userProfile');
        refreshPage();


    };

    return (
        <>
            {profile ? (
                <div className="flex items-center">
                    <img src={profile.picture} alt="" className="w-12 h-12 rounded-full mr-2 border-4 border-white"/>
                    <button onClick={logOut} className="text-black bg-white py-2 px-4 rounded-full hover:bg-gray-100">Log out</button>
                </div>
            ) : (
                <button onClick={() => login()} className="text-black bg-white py-2 px-4 rounded-full hover:bg-gray-100">Sign in with Google 🚀</button>
            )}
        </>
    );
};

export default SignInComponent;