import { Box, Text } from "@chakra-ui/react"
import Post from "./post"

export default function PostsLists({posts}){

    return <Box px="4" align="center">
{posts?.length ===0 ? <Text fontSize="xl" textAlign="center">No posts here yet... feeling little bit lonely here</Text> : posts?.map((post)=> <Post key={post.id} post={post}/>) }

    </Box>
}