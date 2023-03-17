import { Divider, HStack, Stack, Text, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import PostsLists from "components/post/post-lists";
import { usePosts } from "hooks/posts";
import { useUser } from "hooks/users";
import { Avatar } from "./avatar";
import EditProfile from "./edit-profile";
import { useAuth } from "hooks/auth";

export default function Profile(){

    const {id} = useParams()
    const {posts, isLoading: postsLoading} = usePosts(id)
    const {user,isLoading:userLoading} = useUser(id)
    const {user: authUser, isLoading: authLoading} = useAuth()

    const {isOpen, onClose, onOpen} = useDisclosure()

if (userLoading) return "Loading.."
    return <Stack spacing="5">
        <Flex p={["4","6"]} pos="relative" align="center">
            <Avatar user={user} size="xl"/>
            {!authLoading && (authUser.id === id) && <Button pos="absolute" mb="2" top="6" right="6" colorScheme="teal" onClick={onOpen}>
                Change Avatar
            </Button>}
            <Stack ml="10">
                <Text fontSize="2xl">{user.username}</Text>
                <HStack spacing="10">
                    <Text color="gray.700" fontSize={["sm","lg"]}>
                        posts: {posts.length}
                    </Text>
                    <Text color="gray.700" fontSize={["sm","lg"]}>
                        likes: todo!
                    </Text>
                    <Text color="gray.700" fontSize={["sm","lg"]}>
                        Joined: {format(user.date,"MMM yyyy")}
                    </Text>
                </HStack>
            </Stack>
            <EditProfile isOpen={isOpen} onClose={onClose}/>
        </Flex>
        <Divider/>
        {postsLoading ? <Text>Loading posts...</Text> : <PostsLists posts={posts}/>}
    </Stack>
}