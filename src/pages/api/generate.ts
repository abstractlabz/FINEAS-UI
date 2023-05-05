import type { NextApiRequest, NextApiResponse } from 'next';
import prompt from '@/lib/prompt.json'

import { env } from '@/env.mjs';

type GPTResponse = {
    choices: {
        message: {
            content: string;
        }
    }[];
};

type GPTRequest = {
    input: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body as GPTRequest;
    const input = body.input;

    const key = env.NEXT_PUBLIC_OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt.prompt },
                { role: "user", content: input },
            ],
        }),
    });

    const data = await response.json() as GPTResponse;

   return res.status(200).json({ output: data.choices[0]?.message.content });
}
