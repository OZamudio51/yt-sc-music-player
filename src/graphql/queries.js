import { gql } from "@apollo/client";

export const CACHED_SONGS = gql `
    query Songs($id: uuid, $title: String, $artist: String, $thumbnail: String, $duration: Float, $url: String) {
      Song(id: $id, title: $title, artist: $artist, thumbnail: $thumbnail, duration: $duration, url: $url) {
        id
        title
        artist
        thumbnail
        duration
        url
      }
    }
`;