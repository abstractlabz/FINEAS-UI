import SpotifyCard from "@/components/spotify-card";
import type { SpotifyResponse } from "@/types/Spotify";
import { CornerRightDown } from "lucide-react";

type OutputProps = {
    input: string;
    output: SpotifyResponse[];
}

const ChatGPTOutputComponent = ({ input, output }: OutputProps) => {
    return (
        <>
            <div className="flex items-center justify-between px-6 py-2 border-b border-t">
                <p>{input}</p>
                <CornerRightDown className="w-6 h-6 text-gray-500" />
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 overflow-y-scroll lg:grid-cols-2">
                {output.map((song) => (
                    <SpotifyCard key={song.tracks.items[0]?.preview_url} tracks={song.tracks} />
                ))}
            </div>
        </>
    );
};

export default ChatGPTOutputComponent;

