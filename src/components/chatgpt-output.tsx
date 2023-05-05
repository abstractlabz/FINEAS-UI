import SpotifyCard from "@/components/spotify-card";
import { SpotifyResponse } from "@/types/Spotify";

type OutputProps = {
    input: string;
    output: SpotifyResponse[];
}

const ChatGPTOutputComponent = ({ input, output }: OutputProps) => {
    return (
        <>
            <p className="px-6">{input}</p>
            <div className="grid grid-cols-1 gap-1 p-3 overflow-y-scroll lg:grid-cols-2">
                {output.map((song) => (
                    <SpotifyCard key={song.tracks.items[0]?.preview_url} tracks={song.tracks} />
                ))}
            </div>
        </>
    );
};

export default ChatGPTOutputComponent;

