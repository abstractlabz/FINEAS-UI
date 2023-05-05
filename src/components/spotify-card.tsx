import Image from 'next/image';

import { SpotifyResponse } from '@/types/Spotify';

import SpotifyLogo from '../../public/assets/spotify-logo.png';

const SpotifyCard = (spotifyCardProps: SpotifyResponse) => {
    const { tracks } = spotifyCardProps;
    const { items } = tracks;
  
    return (
      <div className="transition duration-500 ease-in-out transform bg-background hover:-translate-y-1 hover:scale-100">
        <div className="flex flex-row gap-3 p-3 space-y-1">
          <div className="flex-shrink-0">
            <img src={items[0]?.album.images[0]?.url} alt={items[0]?.artists[0]?.name} className='w-16 h-16 rounded-sm' />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold leading-none tracking-tight">{items[0]?.name}</h3>
            <p className="text-sm text-muted-foreground">{items[0]?.artists[0]?.name}</p>
            <a className="flex flex-row space-x-2" href={items[0]?.external_urls.spotify as string} target="_blank" rel="noopener noreferrer">
              <Image src={SpotifyLogo} width={20} height={20} alt="Spotify Logo" />
              <p className="text-sm text-muted-foreground">Play on Spotify</p>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
export default SpotifyCard;  
  
