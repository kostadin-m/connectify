import { useAuthContext } from "@features/hooks";
import { PostDocument } from "@types";
import { useEffect, useState } from "react";

export function useFitlerPosts(currentFilter: string, posts: PostDocument[] = []) {
    const [filteredPosts, setFilteredPosts] = useState<PostDocument[]>([])
    const { user } = useAuthContext()
    useEffect(() => {
        setFilteredPosts(posts ? posts.filter((post) => {
            switch (currentFilter) {
                case 'ForYou':
                    return true
                case 'Friends':
                    return user?.friends.includes(post.creatorID)
            }
        }) : [])
    }, [currentFilter, posts])
    return [filteredPosts]
}