
import Navbar from "./ui/navbar/navbar";

import UserSearch from "@features/user/user-search/user-search";
import UserWidget from "@features/user/user-widget/user-widget";
import UserList from "@features/user/user-list/user-list";

import CustomChatCard from "@features/chats/custom-chat-card";
import CustomChatHeader from "@features/chats/custom-chat-header";

import Friends from '@features/friends/friends-widget/friends'
import NavFriends from '@features/friends/nav-friends/nav-friends'
import PeopleYouMayKnow from '@features/friends/people-you-may-know/people-you-may-know'

import Feed from "@features/posts/feed/feed";
import PostForm from "@features/posts/post-form/post-form";


export {
    Feed, Friends, Navbar,
    PeopleYouMayKnow, PostForm, UserWidget, CustomChatCard, CustomChatHeader,
    UserList, UserSearch, NavFriends
}