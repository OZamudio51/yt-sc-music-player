import React, { useContext, useState, useRef, useEffect } from "react";
import QueuedSongList from "./QueuedSongList";
import { Card, CardContent, CardMedia, IconButton, Slider, Typography, CircularProgress } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";
import { SongContext } from "../App";
import { GET_QUEUED_SONGS } from "../graphql/subscriptions";
import { useSubscription } from "@apollo/client";
import ReactPlayer from "react-player";

const SongPlayer = () => {
    const { state, dispatch } = useContext(SongContext);
    const { data, loading, error } = useSubscription(GET_QUEUED_SONGS);
    const [played, setPlayed] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [positionInQueue, setPositionInQueue] = useState(0);
    const reactPlayerRef = useRef();

    useEffect(() => {
        if (loading) {
            return;
        }

        const songIndex = data?.queued_song_list.findIndex(song => song.id === state.song.id);
        setPositionInQueue(songIndex);

    }, [data?.queued_song_list, loading, state.song.id]);

    useEffect(() => {
        if (loading) {
            return;
        }

        const nextSong = data?.queued_song_list[positionInQueue + 1];

        if (played >= 0.99 && nextSong) {
            setPlayed(0);
            dispatch({ type: "SET_SONG", payload: { song: nextSong } })
        }
        
    }, [data?.queued_song_list, loading, played, dispatch, positionInQueue]);

    if (loading) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
                <CircularProgress />
            </div>
        )
    }

    if (error) return <div>Error fetching queued songs</div>

    const handleTogglePlay = () => {
        dispatch(state.isPlaying ? {type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    }

    const handleProgressChange = (event, newValue) => {
        setPlayed(newValue);
    }

    const handleSeekMouseDown = () => {
        setSeeking(true);
    }

    const handleSeekMouseUp = () => {
        setSeeking(false);
        reactPlayerRef.current.seekTo(played);
    }

    const formatDuration = (seconds) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }

    const handlePlayNextSong = () => {
        const nextSong = data?.queued_song_list[positionInQueue + 1];

        if (nextSong) {
            dispatch({ type: "SET_SONG", payload: { song: nextSong } })
        }
    }

    const handlePlayPrevSong = () => {
        const prevSong = data?.queued_song_list[positionInQueue - 1];

        if (prevSong) {
            dispatch({ type: "SET_SONG", payload: { song: prevSong } })
        }
    }

    return (
        <>
            <Card variant="outlined" style={ { display: "flex", justifyContent: "space-between", marginRight: 20 } }>
                <div style={ { display: "flex", flexDirection: "column", padding: "0px 15px", width: "24rem" } }>
                    <CardContent style={{ flex: "1 0 auto" }}>
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div style={ { display: "flex", alignItems: "center", paddingLeft: 8, paddingRight: 8 } }>
                        <IconButton onClick={handlePlayPrevSong}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {state.isPlaying ? <Pause style={ { height: 38, width: 38 } } /> : <PlayArrow style={ { height: 38, width: 38 } } />}
                        </IconButton>
                        <IconButton onClick={handlePlayNextSong} style={{ marginRight: 10 }}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                           {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    <Slider
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onChange={handleProgressChange}
                        value={played}
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <ReactPlayer
                    ref={reactPlayerRef}
                    onProgress={({ played, playedSeconds }) => {
                        if (!seeking) {
                            setPlayed(played);
                            setPlayedSeconds(playedSeconds);
                        }
                    }} 
                    url={state.song.url} 
                    playing={state.isPlaying} hidden />
                <CardMedia
                    style={{ width: 150 }}
                    image={state.song.thumbnail}
                />
            </Card>
            <QueuedSongList data={data}/>
        </>
    )
}

export default SongPlayer;