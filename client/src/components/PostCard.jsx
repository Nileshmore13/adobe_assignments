import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { server } from "../server";

const PostCard = ({content,like,Id ,getPost}) => {

  const handleLike = () =>{
    axios.post(`${server}/posts/${Id}/like`).then((res)=>getPost())
  };
  const handleDislike = () =>{
    axios.post(`${server}/posts/${Id}/unlike`).then((res)=>getPost())
  }
   const handleDelete = () =>{
    axios.delete(`${server}/posts/${Id}`).then((res)=>getPost())
  }

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Box borderWidth="1px" borderRadius="md" borderColor={borderColor} p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontWeight="bold">{content}</Text>
        <Flex alignItems="center">
          <IconButton
            aria-label="Like"
            icon={<FaThumbsUp />}
            variant="ghost"
            colorScheme="blue"
            size="sm"
            onClick={()=>handleLike()}
          />
          <Text mx={2}>{like}</Text>
          <IconButton
            aria-label="Dislike"
            icon={<FaThumbsDown />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={handleDislike}
          />
          <Text mx={2}>dislike</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <IconButton
            aria-label="View"
            icon={<FaEye />}
            variant="ghost"
            colorScheme="blue"
            size="sm"
            // onClick={() => onView(post)}
          />
          <IconButton
            aria-label="Edit"
            icon={<FaEdit />}
            variant="ghost"
            colorScheme="gray"
            size="sm"
            // onClick={() => onEdit(post)}
          />
          <IconButton
            aria-label="Delete"
            icon={<FaTrash />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={handleDelete}
          />
        </Flex>
        <Text fontSize="sm" color="gray.500">
          Posted by
        </Text>
      </Flex>
    </Box>
  );
};

export default PostCard;
