import axios from "axios";

export const getFeed = () =>
  new Promise(async (resolve, reject) => {

// api call to my server to get back a list of videos...
    await axios
      .get(`${hidden}/pops/all`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
      .then((response) => {
        // randomize the order of the posts
        const posts = response.data;

        for (let i = posts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [posts[i], posts[j]] = [posts[j], posts[i]];
        }

        resolve(posts);
      })
      .catch((error) => {
        // console.log("error getting all ", error)
        reject(error);
      });
  });
