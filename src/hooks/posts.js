import { useState } from "react"
import { setDoc, doc, query, collection, orderBy, updateDoc, arrayRemove, arrayUnion, where, deleteDoc, getDocs } from "firebase/firestore"
import { uuidv4 } from "@firebase/util"
import { useToast } from "@chakra-ui/react"
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"

import { db } from "lib/firebase"


export function useAddPost() {

    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function addPost(post) {
        setLoading(true)
        const id = uuidv4()
        try {


            await setDoc(doc(db, "posts", id), {
                ...post,
                id,
                date: Date.now(),
                likes: []
            })
            toast({
                title: "Post succesfully posted",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000
            })
        } catch (err) {
            toast({
                title: "Failed to post the post",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000
            })
        }
        setLoading(false)

    }

    return { addPost, isLoading }
}


export function useToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false)

    async function toggleLike() {
        setLoading(true)
        const docRef = doc(db, "posts", id)
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)
        })
        setLoading(false)
    }

    return { toggleLike, isLoading }
}

export function useDeletePost(id) {
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function deletePost() {
        setLoading(true)
        //Delete post
        try {
            await deleteDoc(doc(db, "posts", id))
        } catch (error) {
            setLoading(false)
            toast({
                title: "Post deletion failed",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            return ("an error occured deleting post",error)}

        //Delete comments

        const commentsRef = collection(db, "comments")
        const q = query(commentsRef, where("postID","==",id))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref))

        toast({
            title: "Post deleted",
            status: "info",
            isClosable: true,
            position: "top",
            duration: 5000
        })
        setLoading(false)
    }

    return { deletePost, isLoading }
}

export function usePost(id) {
    const q = doc(db, "posts", id)

    const [post, isLoading] = useDocumentData(q)

    return { post, isLoading }
}


export function usePosts(uid = null) {

    const q = uid ? query(collection(db, "posts"), orderBy("date", "desc"), where("uid", "==", uid)) : query(collection(db, "posts"), orderBy("date", "desc"))
    const [posts, isLoading, error] = useCollectionData(q)

    if (error) throw error
    return { posts, isLoading }
}