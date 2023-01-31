import React from "react";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const QueuedSongList = () => {
    const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));

    const song = {
        title: "Dummy Title",
        artist: "Dummy Artist",
        thumbnail: "https://customstorestorage.blob.core.windows.net/customstores/royalcoda_v4/images/cover.jpg"
    }

    return (
        greaterThanMedium && (
            <div style={{ margin: "10px 0" }}>
            <Typography color="textSecondary" variant="button">
                QUEUE (5)
            </Typography>
            {Array.from({ length: 5 }, () => song).map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
        )
    )
}

const QueuedSong = ({ song }) => {
    const { thumbnail, artist, title } = song;

    return (
        <div style={{ display: "grid", gridAutoFLow: "column", gridTemplateColumns: "50px auto 40px", gridGap: 12, alignItems: "center", marginTop: 10, marginRight: 20 }}>
            <Avatar src={thumbnail} alt="Song thumbnail" style={{ width: 44, height: 44 }}/>
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <Typography variant="subtitle2" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    {title}
                </Typography>
                <Typography color="textSecondary" variant="body2" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                    {artist}
                </Typography>
            </div>
            <IconButton>
                    <Delete color="error" />
            </IconButton>
        </div>
    )
}

export default QueuedSongList;