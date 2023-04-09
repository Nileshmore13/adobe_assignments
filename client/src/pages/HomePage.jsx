import { Box, Center, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import axios from "axios";
import { server } from "../server";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../redux";

const HomePage = () => {

  const {_id: Id} = useSelector((state)=>state.app.user);
  const posts = useSelector((state)=>state.app.posts)

  const dispatch = useDispatch();


  const getPost =()=>{
    axios.get(`${server}/posts/${Id}`)
    .then((res)=>dispatch(setPost(res.data.post)))
  }

  useEffect(()=>{
    getPost();
  },[])
  return (
    <>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        height="60px"
        bgColor="blue.700"
      >
        <Link>
          <Text bg="transparent" fontSize="xl">
            User List
          </Text>
        </Link>
        <Link to="userAnalys">
          <Text bg="transparent" fontSize="xl">
            User Analytics
          </Text>
        </Link>
        <Link to="postAnalys">
          <Text bg="transparent" fontSize="xl">
            Post Analytics
          </Text>
        </Link>
      </Flex>
      <Box>
        <Flex justify="center">
          <Box width="50%" height="10rem">
            <PostForm />
          </Box>
        </Flex>
      </Box>
      <Center>
        <Box
          mt="7rem"
          width="40%"
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          {
            posts && posts.map((el)=>(
              <PostCard content={el.content} like={el.likes} Id={el._id} getPost={getPost}/>
            )) 
          }
         
        </Box>
      </Center>
    </>
  );
};

export default HomePage;
