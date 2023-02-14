import { gql } from "@apollo/client";

export const ADD_SONG = gql `
    mutation addsong($title: String!, $artist: String!, $thumbnail: String!, $duration: Float!, $url: String!) {
        insert_songs_list(objects: {artist: $artist, title: $title, thumbnail: $thumbnail, duration: $duration, url: $url}) {
            affected_rows
        }
    }
`;

export const ADD_QUEUED_SONG = gql `
    mutation addQueuedSong($title: String!, $artist: String!, $thumbnail: String!, $duration: Float!, $url: String!) {
        insert_queued_song_list(objects: {artist: $artist, title: $title, thumbnail: $thumbnail, duration: $duration, url: $url}) {
            affected_rows
        }
    }
`

export const DELETE_QUEUED_SONG = gql `
    mutation removeQueuedSong($id: uuid!) {
        delete_queued_song_list(where: {id: {_eq: $id}}) {
        affected_rows
        }
    }
`;