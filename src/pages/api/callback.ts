import axios from 'axios';
import { serialize } from 'cookie';
import querystring from 'querystring';

import { env } from '@/env.mjs';

import type { CookieSerializeOptions } from 'cookie';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const client_id = env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = env.NEXT_PUBLIC_CLIENT_SECRET;
const redirect_uri = env.NEXT_PUBLIC_REDIRECT_URI;

type SpotifyResponse = {
  access_token: string;
  refresh_token: string;
}

const handler: NextApiHandler<Response> = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { code } = req.query;

    const tokenParams = querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code',
    });

    const response = await axios.post('https://accounts.spotify.com/api/token', tokenParams, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        },
    });

    const { access_token, refresh_token } = response.data as SpotifyResponse;

    console.log('access_token: ', access_token);
    console.log('refresh_token: ', refresh_token);

    const cookieOptions: CookieSerializeOptions = {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 3600,
        // secure: isProduction,
    };

    const access_token_cookie = serialize('access_token', access_token, cookieOptions);
    const refresh_token_cookie = serialize('refresh_token', refresh_token, cookieOptions);
    
    res.setHeader('Set-Cookie', [access_token_cookie, refresh_token_cookie]);
    res.statusCode = 302;
    res.redirect('/chat');
    res.end();
};

export default handler;
