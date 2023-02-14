import { gql } from "@apollo/client";

export const GET_SONGS = gql `
subscription getSongs {
    songs_list(order_by: {created_at: desc}) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
  
`;

export const GET_QUEUED_SONGS = gql `
subscription getQueuedSongs {
    queued_song_list(order_by: {created_at: desc}) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
  
`;