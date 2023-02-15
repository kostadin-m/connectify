import { ChatCard } from "react-chat-engine-advanced";

//helpers
import { getOtherUser } from "../../helpers/getOtherChatUser";

//types
import { CustomChatCardProps } from "../../types";

const CustomChatCard = (props: CustomChatCardProps) => {
    if (!props.chat) return <div />;

    const otherMember = getOtherUser(props.chat, props.username);
    const username = otherMember ? otherMember.username : "";
    const messageText = props.chat.last_message.text;
    console.log(props.chat)
    const hasNotification =
        props.chat.last_message.sender_username !== props.username;

    return (
        <ChatCard
            title={`${username}`}
            description={
                messageText === null || messageText.length === 0
                    ? "Say hello!"
                    : messageText
            }
            hasNotification={hasNotification}
            avatarUrl={otherMember?.avatar}
            avatarUsername={username}
            avatarStyle={{
                boxShadow: otherMember?.is_online
                    ? "rgb(24 144 255 / 35%) 0px 2px 7px"
                    : "rgb(245 34 45 / 35%) 0px 2px 7px",
                border: otherMember?.is_online
                    ? "1px solid rgb(24 144 255)"
                    : "1px solid rgb(245 34 45)",
            }}
            isActive={props.isActive}
            onClick={() => props.chat && props.onChatCardClick(props.chat.id)}
        />
    );
};
export default CustomChatCard