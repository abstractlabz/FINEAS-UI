import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const Chat = () => {
    return (
        <>
        <GoogleOAuthProvider clientId="684619174291-3515q33o0vl2spdq5t0ur23f7sepgk26.apps.googleusercontent.com">
        <React.StrictMode>
        <p>Hello</p>
        </React.StrictMode>
        </GoogleOAuthProvider>
        </>
    )
}

export default Chat;

