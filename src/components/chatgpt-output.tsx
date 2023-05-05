import SpotifyCard from "@/components/spotify-card";

type SpotifyCardProps = {
    imgSrc: string;
    songTitle: string;
    artist: string;
    songLink: string;
}   

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

type OutputProps = {
    input: string;
    output: SpotifyResponse[];
}

const ChatGPTOutputComponent = ({ input, output }: OutputProps) => {
    return (
        <>
            <p className="px-6">
                {input}
            </p>
            <div className="grid grid-cols-1 gap-1 p-3 overflow-y-scroll lg:grid-cols-2">
              {output.map((song) => (
                <SpotifyCard key={song.tracks.items[0]?.name} tracks={song.tracks} />
                ))}
            </div>
        </>
    );
};

export default ChatGPTOutputComponent;