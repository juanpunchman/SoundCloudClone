import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onErrorImgCoverLoader } from '../../../utils'

import EditBasicInfo from '../EditBasicInfo';

import cancelImgSrc from '../../../img/cancel-btn.png';
import './PlaylistEditForm.css';
import EditPlaylistTracks from '../EditPlaylistTracks';

const PlaylistEditForm = ({ playlist, setShowPlaylistEditModal, setOrToggleAudio }) => {
    const dispatch = useDispatch();
    const [editOption, setEditOption] = useState('basic-info');

    return (
        <div id='edit-playlist-modal-form' className='flx-col'>
            <img
                id='cancel-btn-img'
                src={cancelImgSrc}
                onClick={() => setShowPlaylistEditModal(false)}
                alt='close'
            />

            <div id='select-playlist-edit-option' className='flx-row'>
                <span
                    className={`${editOption === 'basic-info' ? 'active-playlist-edit-option' : 'switch-playlist-option'}`}
                    onClick={() => setEditOption('basic-info')}
                >
                    Basic Info
                </span>

                <span
                    className={`${editOption === 'edit-playlist-tracks' ? 'active-playlist-edit-option' : 'switch-playlist-option'}`}
                    onClick={() => setEditOption('edit-playlist-tracks')}
                >
                    Tracks
                </span>
            </div>

            {/* <div id='edit-playlist-content' className='flx-col'>

            </div> */}

            {editOption === 'basic-info' ?
                <EditBasicInfo
                    playlist={playlist}
                    setShowPlaylistEditModal={setShowPlaylistEditModal}
                /> :
                <EditPlaylistTracks
                playlist={playlist}
                setShowPlaylistEditModal={setShowPlaylistEditModal}
                setOrToggleAudio={setOrToggleAudio}
                />
            }

        </div>
    )
};

export default PlaylistEditForm;
