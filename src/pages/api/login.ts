import type { NextApiHandler, NextApiResponse } from 'next';
import querystring from 'querystring';

import { env } from '../../env.mjs';

const handler: NextApiHandler = (_, res: NextApiResponse) => {
  const scope = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        scope: scope,
        redirect_uri: env.NEXT_PUBLIC_REDIRECT_URI,
    })}`
  );
};

export default handler;
