import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { specIndex, formatDuration } from '@src/utils';
import { addSong2Que, playSong2Que } from '@common/store/actionCreators';
import './style.less';

const renderArtist =  (song) =>{
    const artists = song.artists || song.ar;
    return (
        <div className="artists">
            {artists.map(artist =>(
                <Link key={artist.name} to={{ pathname: `/artistinfo/${artist.id}` }}>
                {' '}
                {artist.name}
                </Link>
            ))}
        </div>
    )
}

function SongList(props) {
    const { tracks, isShowAr = true } = props;
    return(
        <div className="songList">
            <p className="play-all-btn">播放全部({tracks.length})</p>
            <ul className="container">
                {tracks.map((song, index) =>(
                    <li className="item" key={song.id}>
                        <div className="section-one">
                            <span className="index">{specIndex(index+1)}</span>
                            <span className="name">{song.name}</span>
                        </div>
                        <div className="section-two">
                            <Icon
                                type="plus"
                                onClick={() => props.addSong2Que(song)}
                                className="add"
                            />
                            <Icon
                                type="play-circle-o"
                                onClick={() => props.playSong2Que(song)}
                                className="play"
                            />
                            {isShowAr ? renderArtist(song) : null}
                        </div>
                        <span className="album">
                            {song.album ? song.album.name : song.al.name}
                        </span>
                        <span className="duration">
                            {formatDuration(song.duration || song.dt)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapState = (state) =>({
    state:null
})
const mapDispatch = {
    addSong2Que,
    playSong2Que,
}
export default connect(mapState,mapDispatch)(SongList);
