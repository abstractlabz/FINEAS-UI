// import Kendrick from '../../public/assets/kendrick.png';
import Image from 'next/image';

import SpotifyLogo from '../../public/assets/spotify-logo.png';

// import Link from 'next/link';

type SpotifyResponse = {
    tracks: {
        items: {
            name: string;
            preview_url: string;
            uri: string;
            external_urls: {
                spotify: string;
            } 
            artists: {
                name: string;
            }[]
            album: {
                images: {
                    url: string;
                    height: number;
                    width: number;
                }[]
            }
        }[]
    }
}

const SpotifyCardComponent = (SpotifyCardProps: SpotifyResponse) => {

    return (
        <div className="transition duration-500 ease-in-out transform bg-background hover:-translate-y-1 hover:scale-100">
            <div className="flex flex-row gap-3 p-3 space-y-1">
                <div className="flex-shrink-0">
                    <img src={SpotifyCardProps.tracks.items[0]?.album.images[0]?.url} alt={SpotifyCardProps.tracks.items[0]?.artists[0]?.name} className='w-16 h-16 rounded-sm' />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{SpotifyCardProps.tracks.items[0]?.name}</h3>
                    <p className="text-sm text-muted-foreground">{SpotifyCardProps.tracks.items[0]?.artists[0]?.name}</p>
                    <a className="flex flex-row space-x-2"  href={SpotifyCardProps.tracks.items[0]?.external_urls.spotify as string} target="_blank" rel="noopener noreferrer">
                        <Image src={SpotifyLogo} width={20} height={20} alt="Spotify Logo" />
                        <p className="text-sm text-muted-foreground">Play on Spotify</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SpotifyCardComponent;