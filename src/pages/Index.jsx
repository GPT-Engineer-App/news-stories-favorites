import { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Button, Link, useToast, IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?query=LLMs")
      .then((response) => response.json())
      .then((data) => setStories(data.hits))
      .catch((error) => {
        toast({
          title: "Error fetching stories",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  const addFavorite = (story) => {
    setFavorites([...favorites, story]);
    toast({
      title: "Added to Favorites",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFavorite = (storyId) => {
    setFavorites(favorites.filter((story) => story.objectID !== storyId));
    toast({
      title: "Removed from Favorites",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const isFavorite = (storyId) => {
    return favorites.some((story) => story.objectID === storyId);
  };

  return (
    <VStack spacing={4} p={5}>
      <Heading as="h1" size="xl">
        Hacker News - LLM Stories
      </Heading>
      <VStack spacing={4} align="stretch">
        {stories.map((story) => (
          <Box key={story.objectID} p={5} shadow="md" borderWidth="1px">
            <Heading as="h4" size="md">
              {story.title}
            </Heading>
            <Text mt={2}>{story.author}</Text>
            <Link href={story.url} isExternal color="teal.500">
              Read more
            </Link>
            <IconButton aria-label={isFavorite(story.objectID) ? "Remove from favorites" : "Add to favorites"} icon={isFavorite(story.objectID) ? <FaHeart /> : <FaRegHeart />} onClick={() => (isFavorite(story.objectID) ? removeFavorite(story.objectID) : addFavorite(story))} colorScheme={isFavorite(story.objectID) ? "red" : "gray"} variant="outline" size="sm" ml={2} />
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;
