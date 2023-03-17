import { Box, Flex, IconButton, Text, useDisclosure, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { Avatar } from "components/profile/avatar";
import { useUser } from "hooks/users";

import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/UsernameButton";
import { FaTrash } from "react-icons/fa";
import { useDeleteComment } from "hooks/comments";
import { useAuth } from "hooks/auth";

export default function Comment({comment}){
const {text, uid, date, id} = comment
const {isOpen, onOpen, onClose} = useDisclosure()

const {user, isLoading: userLoading} = useUser(uid)
const {user: authUser, isLoading: authLoading} = useAuth()

const {deleteComment, isLoading: deleteLoading} = useDeleteComment(id)



if (userLoading) return "Loading..."

    return <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
        <Flex pb="2">
            <Avatar user={user} size="sm"/>
            <Box flex="1" ml="4">
                <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
                    <Box><UsernameButton user={user}/>
                        <Text fontSize="xs" color="gray.500">
                            {formatDistanceToNow(date)} ago
                        </Text>
                    </Box>
                    {
                      !authLoading && authUser.id === uid && 
                    
                    <IconButton 
                    size="sm" 
                    ml="auto" 
                    icon={<FaTrash/>} 
                    colorScheme="red" 
                    variant="ghost" 
                    isRound 
                    // onClick={deleteComment}
                    onClick={onOpen}
                    isLoading={deleteLoading}/> 
}
<Modal isOpen={isOpen} onClose={onClose}>
<ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this comment?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' colorScheme="red" onClick={deleteComment}>Delete</Button>
          </ModalFooter>
        </ModalContent>
</Modal>
                </Flex>
                <Box pt="2" fontSize="sm">
                    <Text>{text}</Text>
                </Box>
            </Box>
        </Flex>
    </Box>
}