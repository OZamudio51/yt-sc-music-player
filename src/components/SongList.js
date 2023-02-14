import React, { useContext, useEffect, useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { PlayArrow, Pause, Save } from "@mui/icons-material";
import { CircularProgress, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import { SongContext } from "../App";
import { GET_SONGS } from "../graphql/subscriptions";
import { ADD_QUEUED_SONG } from "../graphql/mutations";

const SongList = () => {
    const { data, loading, error } = useSubscription(GET_SONGS);

    if (loading) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
                <CircularProgress />
            </div>
        )
    }

    if (error) return <div>Error fetching songs</div>

    return <div>{data.songs_list.map(song => (
        <Song key={song.id} song={song}/>
    ))}</div>
}

const Song = ({ song }) => {
    const [addQueuedSong, { queuedSongError }] = useMutation(ADD_QUEUED_SONG);

    if (queuedSongError) {
        console.error(queuedSongError);
    }

    const { id } = song;
    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
    const { title, artist, thumbnail } = song;

    useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;

        setCurrentSongPlaying(isSongPlaying);

    }, [id, state.song.id, state.isPlaying]);

    const handleAddSongToQueue = async () => {
        try {
            const { url, thumbnail, duration, title, artist } = song;

            await addQueuedSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null
                },
            })

        } catch (err) {
            console.error("error adding queued song: ", err);
        }
    }

    const handleTogglePlay = () => {
        dispatch({ type: "SET_SONG", payload: { song }});

        dispatch(state.isPlaying ? {type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    }

    return <Card spacing={3} style={{ marginBottom: 20, borderRadius: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <CardMedia image={thumbnail} style={{ objectFit: "cover", width: 140, height: 140 }}/>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p" color="textSecondary">
                        {artist}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={handleTogglePlay} size="small" color="primary">
                        {currentSongPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={handleAddSongToQueue} size="small" color="secondary">
                        <Save />
                    </IconButton>
                </CardActions>
            </div>
        </div>
    </Card>
}

export default SongList;