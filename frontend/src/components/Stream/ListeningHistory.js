import { useSelector } from "react-redux";

import './ListeningHistory.css'

const ListeningHistory = ({ setOrToggleAudio }) => {
  const history = useSelector(state => state.audioPlayer.history);
  const allSongs = useSelector(state => state.songs);
  const allArtists = useSelector(state => state.artists);
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

  const playBtnImg = 'https://cdn-icons-png.flaticon.com/512/73/73940.png';
  const pauseBtnImg = 'https://cdn-icons-png.flaticon.com/512/786/786279.png';

  if (!history) return null;
  const lastThreeSongsPlayed = history.slice(-3)

  let listenHistorySongIds = [];
  while (lastThreeSongsPlayed.length) {
    let songId = lastThreeSongsPlayed.pop();
    listenHistorySongIds.push(songId)
  }

  const songTileRenders = listenHistorySongIds.map((songId, ind) => {
    let playPauseImg = playBtnImg;
    const song = allSongs[songId];
    const artist = allArtists[song.userId];
    let btnDisplay = 'hidden-play-btn';

    if (currentTrack.id === songId) {
      if (isPlaying) {
        btnDisplay = '';
        playPauseImg=pauseBtnImg;
      }
    }

    return (
      <div className='listen-history-card flx-row' key={ind}>

        <div className='listen-history-img-wrapper'>
          <img className='listen-history-img' src={song.imageUrl} />

          <div className='history-btn-wrapper'>
            <button onClick={(e) => setOrToggleAudio(e, song)} className={`listen-history-btn-overlay ${btnDisplay}`} >
              <img className='history-tile-play-pause' src={playPauseImg} />
            </button>
          </div>

        </div>

        <div className='listen-history-card-details flx-col'>
          <span className='history--artist-name'>{artist.username}</span>
          <span>{song.title}</span>
        </div>

      </div>
    )
  })

  return (
    <div className='listening-history-content flx-col'>
      <span className='listening-history-text'>Listening History</span>
      {songTileRenders}
    </div>
  )
}

export default ListeningHistory;
