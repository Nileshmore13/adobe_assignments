import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../server";
import { useDispatch, useSelector } from "react-redux";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {_id:userId}= useSelector((state) => state.app.user);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true)
    axios
      .post(`${server}/posts`, {userId, content })
      .then((res) => {
        setIsSubmitting(false);
        alert(res.data.message);
        setContent("");
      })
      .catch((err) => setIsSubmitting(false));
  };

  return (
    <Box py={6}>
      <Heading mb={6}>{"Create Post"}</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              id="content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            {"Create Post"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PostForm;
