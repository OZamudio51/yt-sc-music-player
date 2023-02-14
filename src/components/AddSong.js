import { AddBoxOutlined, Link } from "@mui/icons-material";
import { InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutations";

const DEFAULT_SONG = {
    duration: 0, 
    title: "", 
    artist: "",
    thumbnail: ""
}

const AddSong = () => {
    const [addsong, { error }] = useMutation(ADD_SONG);
    const [dialog, setDialog] = useState(false);
    const [url, setUrl] = useState("");
    const [playable, setPlayable] = useState(false);
    const [song, setSong] = useState(DEFAULT_SONG);

    const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up("sm"));

    useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);

        setPlayable(isPlayable);
    }, [url]);

    const handleChangeSong = event => {
        const { name, value } = event.target;

        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }));
    }

    const handleCloseDialog = () => {
        setDialog(false);
    }

    const handleEditSong = async ({ player }) => {
        const nestedPlayer = player.player.player;
        let songData;

        if (nestedPlayer.getVideoData) {
            songData = getYouTubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer);
        }

        setSong({ ...songData, url })
    }

    const handleAddSong = async () => {
        try {
            const { url, thumbnail, duration, title, artist } = song;

            await addsong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null
                },
            })

            handleCloseDialog();
            setSong(DEFAULT_SONG);
            setUrl("");
        } catch (err) {
            console.error("error adding song: ", err);
        }
    }

    const getYouTubeInfo = player => {
        const duration = player.getDuration();

        const { title, video_id, author } = player.getVideoData();

        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

        return {
            duration, 
            title, 
            artist: author,
            thumbnail 
        }
    }

    const getSoundCloudInfo = player => {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title, 
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace("-large", "-t500x500")
                    });
                }
            });
        })
    }

    const handleError = (field) => {
        return error?.graphQLErrors[0]?.extensions?.path.includes(field);
    }

    const { thumbnail, title, artist } = song;

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Dialog
                open={dialog}
                onClose={handleCloseDialog}
                style={{ textAlign: "center" }}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img src={thumbnail}
                        alt="Song Thumbnail"
                        style={{ width: "90%" }}
                    />
                    <TextField
                        value={title}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        error={handleError("title")}
                        helperText={handleError("title") && "Fill out field"}
                    />
                    <TextField
                        value={artist}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="artist"
                        label="Artist"
                        fullWidth
                        error={handleError("artist")}
                        helperText={handleError("artist") && "Fill out field"}
                    />
                    <TextField
                        value={thumbnail}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="thumbnail"
                        label="Thumbnail"
                        fullWidth
                        error={handleError("thumbnail")}
                        helperText={handleError("thumbnail") && "Fill out field"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </Dialog>
            <TextField
                onChange={e => setUrl(e.target.value)}
                value={url}
                placeholder="Add Youtube or Soundcloud url"
                style={{ marginBottom: 20 }}
                fullWidth
                variant="standard"
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button 
            disabled={!playable}
            variant="contained"
            color="primary"
            spacing={1}
            style={  greaterThanSmall ? { marginLeft: 10, marginBottom: 20 } : { marginLeft: 10, marginBottom: 20, marginTop: 20 }}
            endIcon={<AddBoxOutlined />}
            onClick={() => setDialog(true)}
            >
            Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
}

export default AddSong;