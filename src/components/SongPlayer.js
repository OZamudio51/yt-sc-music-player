import React from "react";
import QueuedSongList from "./QueuedSongList";
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from "@mui/material";
import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";

const SongPlayer = () => {
    return (
        <>
            <Card variant="outlined" style={{ display: "flex", justifyContent: "space-between", marginRight: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", padding: "0px 15px" }}>
                    <CardContent style={{ flex: "1 0 auto" }}>
                        <Typography variant="h5" component="h3">
                            Title
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            Artist
                        </Typography>
                    </CardContent>
                    <div style={{ display: "flex", alignItems: "center", paddingLeft: 8, paddingRight: 8 }}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            <PlayArrow style={{ height: 38, width: 38}} />
                        </IconButton>
                        <IconButton style={{ marginRight: 10 }}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    <Slider 
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <CardMedia
                    style={{ width: 150 }}
                    image="https://customstorestorage.blob.core.windows.net/customstores/royalcoda_v4/images/cover.jpg"
                />
            </Card>
            <QueuedSongList />
        </>
    )
}

export default SongPlayer;