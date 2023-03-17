import { Avatar as ChakraAvatar } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { PROTECTED } from "lib/routes"

export function Avatar({ user, size = "xl", overideAvatar=null }) {

    if (!user) return "Loading..."

    return <ChakraAvatar
        name={user.username}
        size={size}
        src={overideAvatar || user.avatar}
        _hover={{ cursor: "pointer", opacity: "0.8" }}
        to={`${PROTECTED}/profile/${user.id}`}
        as={Link} />
}