import Layout from "antd/lib/layout/layout";
import React from "react";
import NavBar from "../nav/NavBar";
// import NoPodcast from "./NoPodcast";
import PodcastList from "../podcast/PodcastList";

const HomePage = () => {
  return (
    <Layout>
      <NavBar />
      <PodcastList />
    </Layout>
  );
};

export default HomePage;
