import React, { createContext, useContext, useReducer } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import "./index.css";
import { songReducer } from "./reducer";

export const SongContext = createContext({
  song: {
    id: "245451bb-724c-43c4-b7ec-63386a332524",
    title: "For The Jeers (Visualizer)",
    artist: "Dance Gavin Dance",
    thumbnail: "http://img.youtube.com/vi/uXomL6AcikE/0.jpg",
    url: "https://www.youtube.com/watch?v=uXomL6AcikE",
    duration: 252
  },
  isPlaying: false
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
  const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up("sm"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
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
    </SongContext.Provider>
  );
}

export default App;