import type { NextApiHandler, NextApiResponse } from 'next';
import querystring from 'querystring';

import { env } from '../../env.mjs';

const redirect_uri = env.NODE_ENV === 'production' ? env.NEXT_PUBLIC_REDIRECT_URI : 'http://localhost:3000/api/callback';

const handler: NextApiHandler = (_, res: NextApiResponse) => {
  const scope = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
    })}`
  );
};

export default handler;
