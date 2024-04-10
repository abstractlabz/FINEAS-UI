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
        onSuccess: async (codeResponse) => {
            try {
                const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`,
                        Accept: 'application/json',
                    },
                });
    
                if (userInfoResponse.data && userInfoResponse.data.email) {
                    const id_hash_val = crypto.createHash('sha256').update(userInfoResponse.data.email).digest('hex');
                    await fetchUserProfile(id_hash_val, 2); // Passing 2 as the retry count
                }
            } catch (error) {
                console.log('Login Failed:', error);
            }
        },
        onError: (error) => console.log('Login Failed:', error),
    });
    
    // Fetch user profile with retry logic
    const fetchUserProfile = async (id_hash: string, retryCount: number) => {
        try {
            const res = await axios.get(`https://upgrade.fineasapp.io:2096/get-user-info?id_hash=${id_hash}`);
            const data = res.data;
    
            const userProfile = {
                picture: data.picture || '', // Use empty string as fallback
                id_hash: id_hash,
                stripe_customer_id: data.user.stripe_customer_id || '', // You might need to update this accordingly
                email: data.email,
                credits: data.user.credits,
                is_member: data.user.is_member,
            };
    
            console.log(data.user.stripe_customer_id)
            console.log(userProfile);
            setProfile(userProfile);
            Cookies.set('userProfile', JSON.stringify(userProfile));
            refreshPage();
        } catch (error: Error | any) {
            console.error('Failed to fetch user profile:', error);
            if (retryCount > 0 && error.response && error.response.status === 500) {
                console.log(`Retrying... attempts left: ${retryCount}`);
                await fetchUserProfile(id_hash, retryCount - 1);
            }
        }
    };
    

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