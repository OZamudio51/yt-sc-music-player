import React from "react";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMutation } from "@apollo/client";
import { DELETE_QUEUED_SONG } from "../graphql/mutations";

const QueuedSongList = ({ data }) => {
    const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));

    return (
        greaterThanMedium && (
            <div style={{ margin: "10px 0" }}>
            <Typography color="textSecondary" variant="button">
                QUEUE ({data.queued_song_list.length})
            </Typography>
            {data.queued_song_list.map(song => (
                <QueuedSong key={song.id} song={song} />
            ))}
        </div>
        )
    )
}

const QueuedSong = ({ song }) => {
    const { thumbnail, title, artist, id } = song;

    const [deleteQueuedSong] = useMutation(DELETE_QUEUED_SONG);

    const handleDeleteQueuedSong = async (id) => {
        const data = await deleteQueuedSong({
        variables: { id: id },
        })
    
        console.log("delete queued song", data);
      }

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
            <IconButton onClick={() => handleDeleteQueuedSong(id)}>
                    <Delete color="error" />
            </IconButton>
        </div>
    )
}

export default QueuedSongList;