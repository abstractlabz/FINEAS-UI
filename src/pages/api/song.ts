import fetch from 'node-fetch';

import { SpotifyResponse } from '@/types/Spotify';

import type { NextApiRequest, NextApiResponse } from 'next';

type SongRequest = {
    query: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body as SongRequest;
    const query = body.query;
    const allCookies = req.cookies;

    console.log('allCookies: ', allCookies);
    console.log('query: ', query);

    if (!allCookies?.access_token) {
        return res.status(401).json({ error: 'Unauthorized' });
    } 

    const access_token = allCookies.access_token;
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    }).catch((error) => {
        console.error('Error:', error);
    });

    if (!response) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    const data = await response.json() as SpotifyResponse;
    res.status(200).json(data);
}
