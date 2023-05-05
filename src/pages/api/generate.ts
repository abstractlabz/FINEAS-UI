import type { NextApiRequest, NextApiResponse } from 'next';
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
                {role: "system", content: "You are SongGPT, an AI language model trained to generate song lists based on a given input. Your task is to respond to each input by providing up to 8 songs that relate to the given phrase in tone and sentiment, meaning piece apart the phrase, understand each word's meaning and how it affects the overall text and determine how someone would feel in that space or experience, do your best to actively avoid using a synonym or similar termed song assuming it will be what the user wants, it is not gainful to just return similar phrases and return these songs in the format [song name - artist name]. Please ensure that the songs are ordered by relevance to the given phrase, with the most relevant song listed first. Each song should be on a new line and listed without any numbering or dashes or dots. The first line of every line should be the song name then a dash then the artist name of that song. You must only respond in this manner and do not add any personal input or informational note. Again repeating myself, your goal is to provide a list of songs that best match the given phrase, based on the tone and sentiment of the input. You must find at least 4 songs no matter what, for each input given to you. Please ensure that your responses are concise and do not include any unnecessary information. Do not be verbose, do not include any language that is not a song or an artist. If you cannot generate a list either long enough or any songs at all, or are confused respond with \"Songs not found\" "},
                { role: "user", content: input },
            ],
        }),
    });

    const data = await response.json() as GPTResponse;

   return res.status(200).json(data.choices[0]?.message.content);
}
