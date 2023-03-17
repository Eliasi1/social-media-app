import { Flex, IconButton, useDisclosure, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useAuth } from "hooks/auth";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaRegComment, FaTrash } from "react-icons/fa"
import { useToggleLike, useDeletePost } from 'hooks/posts'
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import { useComments } from "hooks/comments";

export function Actions({ post }) {
    const { likes, id, uid } = post

    const { user, isLoading: userLoading } = useAuth()
    const { deletePost, isLoading: deleteLoading } = useDeletePost(id)
    const { comments, isLoading: commentLoading } = useComments(id)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isLiked = likes.includes(user?.id)

    const config = {
        id,
        isLiked,
        uid: user?.id
    }
    const { toggleLike, isLoading: likeLoading } = useToggleLike(config)



    return <Flex p="2">

        <Flex alignItems="center">
            <IconButton
                onClick={toggleLike}
                isLoading={likeLoading || userLoading}
                size="md"
                colorScheme="red"
                variant="ghost"
                icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                isRound
            />
            {likes.length}
        </Flex>
        <Flex alignItems="center" ml="2">
            <IconButton
                as={Link}
                to={`${PROTECTED}/comments/${id}`}
                // isLoading={likeLoading || userLoading}
                size="md"
                colorScheme="teal"
                variant="ghost"
                icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
                isRound
            />
            {comments?.length}
            {/* {for better performance, we will want to use firebase index, and then the .count() instead of fetching all the comments} */}
        </Flex>
        {!userLoading && user.id === uid && <IconButton
            ml="auto"
            onClick={onOpen}
            isLoading={deleteLoading}
            size="md"
            colorScheme="red"
            variant="ghost"
            icon={<FaTrash />}
            isRound
        />}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this Post?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' colorScheme="red" onClick={()=>{onClose();deletePost()}}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </Flex>
}