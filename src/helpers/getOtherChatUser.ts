import { ChatObject, PersonObject } from "react-chat-engine-advanced";

export const getOtherUser = (
    chat: ChatObject,
    username: string
): PersonObject | undefined => {
    console.log(username)
    const otherMember = chat.people.find(
        (member) => member.person.username !== username
    );
    return otherMember?.person;
};