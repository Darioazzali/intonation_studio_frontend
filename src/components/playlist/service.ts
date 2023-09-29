import { useEffect, useRef, useState } from "react";
import { nextPage, Page, Playlist, Tutorial } from "../../interfaces";

const fetchTutorialsByPlaylist = async (id?: string | undefined) => {
  if (!id) {
    throw new Error("No playlist Id got");
  }
  const response = await fetch(
    "https://intonationstudio.com/api/tutorials/?" +
      new URLSearchParams({
        language: "",
        playlists: id.toString(),
      }),
    { method: "GET", mode: "cors" }
  );
  if (!response.ok) {
    switch (response.status) {
      case 400: {
        throw new Error("There is not such a playlist, ...yet");
      }
    }
    throw new Error("Error fetching the playlist");
  } else return response;
};

export const usePlaylist = (playlistId: string | undefined) => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<nextPage>();
  const [playlist, setPlaylist] = useState<Playlist>();

  const fetchTutorials = async () => {
    try {
      setIsLoading(true);
      const response = await fetchTutorialsByPlaylist(playlistId);
      if (!response.ok) throw new Error("Error fetching the resource");
      const page: Page = await response.json();
      setNext(page.next);
      setTutorials(page.results);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const showMoreTutorials = async () => {
    try {
      setIsLoading(true);
      if (!next) return null;
      const nextHttps = next?.replace("http", "http");
      const response = await fetch(nextHttps, {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error fetching next page");
      }
      const nextPage: Page = await response.json();
      setTutorials((prevTutorials) => {
        return [...prevTutorials, ...nextPage.results];
      });
      setNext(nextPage.next);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlaylistById = async () => {
    try {
      const response = await fetch(
        "http://intonationstudio.com/api/playlists/" + playlistId
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the Playlist");
      }
      const data = await response.json();
      setPlaylist(data);
    } catch (err) {
      console.log("Err");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTutorials();
    fetchPlaylistById();
  }, []);

  return {
    isLoading: isLoading,
    tutorials: tutorials,
    playlist: playlist,
    showMoreTutorials: showMoreTutorials,
    next: next,
  };
};
