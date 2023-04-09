import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../server";
import { Box } from "@chakra-ui/react";
import PostCard from "../components/PostCard";

const PostAnalytics = () => {
    const [topPost,setTopPost] = useState([])
  useEffect(() => {
    axios.get(`${server}/posts/analytics/posts/top-liked`)
    .then((res)=>setTopPost(res.data.top_Liked_Post))
  }, []);
  return <Box>

    {
        topPost && topPost.map((el)=>(
            <PostCard content={el.content} like={el.likes} Id={el._id} />
        ))
    }
  </Box>;
};

export default PostAnalytics;
