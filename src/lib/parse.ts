// type Song = {

// }

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

const parseSong = async (song_list: string): Promise<SpotifyResponse[]> => {
    // Defines the output array
    const allSongs: SpotifyResponse[] = [];

    // Splits the gpt output into an array of songs
    const songs: string[] = song_list.split("\n");


    // Iterates through each song and adds it to the output array
    for (const song of songs) {
      // Split the song into the song name and artist (for spotify search)
      const songName = `${song?.split("-")[0] as string} ${song?.split("-")[1] as string}`

      // remove anything that isnt a letter or a space
      const regex = /[^a-zA-Z ]/g;

      // Removes any non letter or space characters from the song name
      const clean = songName.replace(regex, "");

      // Replaces spaces with %20 for the spotify search 
      const fixedSong: string = clean.replace(/ /g, "%20");

      // Makes a request to the spotify api
      try {
        const response = await fetch('/api/song/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: fixedSong,
          }),
        })

        if (!response) {
          allSongs.push({} as SpotifyResponse);
        }

        // Adds the song to the output array
        const data = await response.json() as SpotifyResponse;
        console.log(data);
        allSongs.push(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return allSongs.slice(0, 6).filter((song) => song.tracks.items[0]?.name.toLowerCase() !== 'undefined' || song.tracks.items.length === 0)
};
  
  export { parseSong };
  
  //"Dark Knight Dummo - Trippie Redd feat. Travis Scott  \nBatman - Jaden Smith  \nMurder on My Mind - YNW Melly  \nGotham City - R. Kelly"