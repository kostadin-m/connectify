import {
  Avatar,
  ChatHeaderProps,
  ChatObject,
  PersonObject
} from "react-chat-engine-advanced";

//helpers
import { getOtherUser } from "./utils/get-other-chat-user";

//custom hooks
import { useThemeContext } from "@features/hooks";

//types
export interface CustomChatHeaderProps extends ChatHeaderProps {
  chat?: ChatObject;
  username: string;
  secret: string;
}

export default function CustomChatHeader(props: CustomChatHeaderProps) {
  const { theme } = useThemeContext()

  const otherMember: PersonObject | undefined = props.chat && getOtherUser(props.chat, props.username);
  return (
    <div className={`ce-custom-chat-header ${theme}`}>
      {otherMember ? (
        <div className="custom-profile">
          <Avatar
            className="ce-custom-header-avatar"
            avatarUrl={otherMember?.avatar}
            username={otherMember?.username}
            isOnline={otherMember?.is_online}
          />
          <div className="ce-custom-header-text">
            <div className="ce-custom-header-title">
              {otherMember.username}
            </div>
            <div className="ce-custom-header-subtitle">
              {otherMember.is_online ? "Online" : "Offline"}
            </div>
          </div>
        </div>
      ) : (<h2>No user</h2>)}
      <style>{`
      .ce-custom-header-avatar { display: inline-block; position: relative; top: 5px; margin-left: "48px";
                }; border: 1px solid ${otherMember?.is_online ? "rgb(24, 144, 255)" : "#fa541c"
        }; box-shadow: ${otherMember?.is_online
          ? "rgb(24 144 255 / 35%)"
          : "rgb(245 34 45 / 35%)"
        } 0px 2px 7px; width: 38px !important; height: 38px !important; font-size: 14px !important; transition: all 0.66s ease; }
      `}</style>
    </div>
  );

}