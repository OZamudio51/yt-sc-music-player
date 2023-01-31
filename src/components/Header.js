import { RadioTwoTone } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {

    return (
        <AppBar color="primary" position="fixed" enableColorOnDark>
            <Toolbar>
                <RadioTwoTone />
                <Typography style={{ marginLeft: 8 }} variant="h6" component="h1">
                    YT & SC Music Player
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;