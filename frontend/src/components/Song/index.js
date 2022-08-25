import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCurrentSong } from "../../store/song";

import Comment from "../Comment";

import './Song.css';

const Song = () => {
  const { songId } = useParams();

  const dispatch = useDispatch();

  let song = useSelector(state => state.songs.current);
  let user = useSelector(state => state.session.user)

  const [hasLoaded, setHasLoaded] = useState(false);

  if (isNaN(Number(songId))) return <div>404</div>

  if (!song || song.id !== Number(songId)) {

    if (hasLoaded) return <div>Uh oh... something went wrong.</div>

    dispatch(fetchCurrentSong(songId))
      .then(() => setHasLoaded(true));
    return <div>Loading...</div>
  }

  // array of objs
  let commentsList = song.comments
    .map(comment => {
      console.log(comment)
      return <Comment comment={comment}/>
    });
  console.log(commentsList)

  return (
    <div className='outerMost-wrapper-container'>
      <h2>Song Component</h2>

      <div className='song-banner'>         {/* START OF SONG-BANNER  */}

        <div className='song-banner__left'>
          <div className='song-banner__left__top'>

            <div className="play-button-container"><p>Play button</p></div>
            {/*comment: p tags were making it center */}

            <div className='song-banner__top__song-info'>
              <p id='song-title'>{song.title}</p>
              <p id='song-aritst'>{song.Artist.username}</p>
            </div>

          </div>

          <div className='song-banner__left__bottom'>
            <div className='song-waveform'>Waveform goes here</div>
          </div>

        </div>

        <div className='song-banner__right'>
          <div className='song-image-container'>
            <img className='banner-song-image' src={song.imageUrl} alt={`${song.title}'s Cover`} />
          </div>
        </div>

      </div>                                {/* END OF SONG-BANNER  */}

      <div className='mainContainer'>

        <div className='left-mainContainer'>

          <div className='userInteraction'>
            <div className='commentForm-wrapper'>
              <div className='commenterProfilePic'>40 x40</div>
              <div className='commentForm'>comment field</div>
            </div>

            <div className='userInteraction__buttons'>
              <button>Like</button>
              <button>Add to playlist</button>
            </div>
          </div>

          <div className='discourse'>

            <div className='discourse__left artistDetails'>
              <div>artist profile picture - 120x120 square div - circle picture</div>
              <div>artist name</div>
            </div>


            <div className='discourse__right'>

              <div className='discourse__songInfo'>
                {song.description && <div className='songDescription'>{song.description}</div>}
              </div>

              <div className='discourse__comments'>
                <span># of comments</span>
                <p>List comments here</p>
                {commentsList}
              </div>

            </div>

          </div>

        </div>

        <div className='right-mainContainer'>

        </div>

      </div>                              {/* END OF MAIN-CONTAINER */}

    </div>
  );
};

export default Song;
