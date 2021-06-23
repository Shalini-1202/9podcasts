import React, { useEffect, useState } from "react";
import axios from "axios";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = () => {
      axios.get("http://localhost:9999/podcasts").then((resp) => {
        setPodcasts(resp.data);
      });
    };
    fetchPodcasts();
  }, [setPodcasts]);

  return (
    <div>
      {podcasts.map((p) => (
        <p>{JSON.stringify(p)}</p>
      ))}
    </div>
  );
};

export default PodcastList;
