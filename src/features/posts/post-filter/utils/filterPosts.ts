import { useAuthContext } from "@features/hooks";
import { PostDocument } from "@types";

export function filterPosts(currentFilter: string, posts: PostDocument[] = []) {
    const { user } = useAuthContext()

    const filteredPosts = posts ? posts.filter((post) => {
        switch (currentFilter) {
            case 'ForYou':
                return true
            case 'Friends':
                return user?.friends.includes(post.creatorID)
        }
    }) : []
    return filteredPosts
}