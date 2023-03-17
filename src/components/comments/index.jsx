import { Box } from "@chakra-ui/react";
import Post from "components/post/post";
import { usePost } from "hooks/posts";
import { useParams } from "react-router-dom";
import NewComment from "./new-comment";
import CommentList from "./comment-list";


export default function Comments(){

    const {postID} = useParams()
    const {post, isLoading} = usePost(postID)

    if (isLoading) return "Loading..."

    return <Box align="center" pt="50">
        <Post post={post} />
        <NewComment post={post} />
        <CommentList post={post}/>
    </Box>
}