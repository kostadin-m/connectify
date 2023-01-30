export const getOtherUser = (
    chat,
    username
) => {
    const otherMember = chat.people.find(
        (member) => member.person.username !== username
    );
    return otherMember?.person;
};