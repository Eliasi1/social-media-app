import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { Avatar } from "components/profile/avatar";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { useUser } from "hooks/users";
import { PROTECTED } from "lib/routes";
import UsernameButton from "components/profile/UsernameButton";

export default function Header({post}) {
const { uid , date} = post
    const { user, isLoading } = useUser(uid)
    if (isLoading || !user) return "Loading.."


    return (
        <Flex
            alignItems="center"
            borderBottom="2px solid"
            borderColor="teal.100"
            p="3"
            bg="gray.50"
        >
            <Avatar user={user} size="md" />
            <Box ml="4">
<UsernameButton user={user}/>
                <Text fontSize="sm" color="gray.500">{formatDistanceToNow(date)} ago</Text>
            </Box>
        </Flex>
    )
}