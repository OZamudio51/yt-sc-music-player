import { AddBoxOutlined, Link } from "@mui/icons-material";
import { InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

const AddSong = () => {
    const [dialog, setDialog] = useState(false);

    const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up("sm"));

    const handleCloseDialog = () => {
        setDialog(false);
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Dialog
                open={dialog}
                onClose={handleCloseDialog}
                style={{ textAlign: "center" }}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img src="https://customstorestorage.blob.core.windows.net/customstores/royalcoda_v4/images/cover.jpg"
                        alt="Song Thumbnail"
                        style={{ width: "90%" }}
                    />
                    <TextField 
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                    />
                    <TextField 
                        margin="dense"
                        name="artist"
                        label="Artist"
                        fullWidth
                    />
                    <TextField 
                        margin="dense"
                        name="thumbnail"
                        label="Thumbnail"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </Dialog>
            <TextField 
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
            variant="contained"
            color="primary"
            spacing={1}
            style={  greaterThanSmall ? { marginLeft: 10, marginBottom: 20 } : { marginLeft: 10, marginBottom: 20, marginTop: 20 }}
            endIcon={<AddBoxOutlined />}
            onClick={() => setDialog(true)}
            >
            Add
            </Button>
        </div>
    )
}

export default AddSong;