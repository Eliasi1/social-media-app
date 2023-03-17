import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import { setDoc, doc, query, collection, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ postID, uid }) {
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function addComment(text) {
        setLoading(true)
        const id = uuidv4()
        const date = Date.now()
        const docRef = doc(db, "comments", id)
        await setDoc(docRef, { text, id, uid, postID, date })

        toast({
            title: "Comment added",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000
        })

        setLoading(false)
    }


    return { addComment, isLoading }
}

export function useComments(postID) {
    // const q = query(collection(db, "comments",where("postID", "==", postID)))
    const commentsRef = collection(db, "comments")
    const q = query(commentsRef, where("postID", "==", postID), orderBy("date", "asc"))

    const [comments, isLoading, error] = useCollectionData(q)


    if (error) throw error


    return { comments, isLoading }

}

export function useDeleteComment(id) {
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function deleteComment() {
        setLoading(true)
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)
            toast({
                title: "Comment deleted",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            setLoading(false)
    }


    return { deleteComment, isLoading }
}