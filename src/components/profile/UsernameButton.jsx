import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PROTECTED } from "lib/routes";

export default function UsernameButton({user}) {

    const {id, username} = user

    return <Button
        colorScheme="teal"
        variant="link"
        to={`${PROTECTED}/profile/${id}`}
        as={Link}
    >{username}</Button>
}