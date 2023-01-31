import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./index.css";

function App() {
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
  const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up("sm"));

  return (
    <>
    {greaterThanSmall && <Header />}
      <Grid container spacing={3}>
        <Grid style={{
          paddingTop: greaterThanSmall ? 90 : 10
        }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid style={
          greaterThanMedium ? {
          position: "fixed",
          width: "100%",
          right: 0,
          top: 70
        } : {
          position: "fixed",
          width: "100%",
          left: 0,
          bottom: 0
        }} 
        item 
        xs={12} 
        md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;