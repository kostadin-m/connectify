import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
//custom hooks
import { useThemeContext, useAuthContext } from '@features/hooks'

//styles
import '@features/chats/chat.css'

//custom components
import { CustomChatCard, CustomChatHeader } from '@features/chats'



export default function Messages() {
  const { user } = useAuthContext()


  const projectID = "4c6608ac-11b9-4e9e-abc1-c7bfeefa11eb"
  const chatProps = useMultiChatLogic(projectID, `${user?.displayName}`, `${user?.id}`)
  const { theme } = useThemeContext()
  return (
    <div className={theme} style={{ marginTop: '70px', height: 'calc(100dvh - 70px)', overflow: 'hidden' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        style={{ width: '95%' }}
        {...chatProps}
        renderChatCard={(props) => (
          <CustomChatCard
            {...props}
            username={chatProps.username}
            onChatCardClick={chatProps.onChatCardClick}
            isActive={
              props.chat !== undefined &&
              chatProps.activeChatId === props.chat.id
            }
            chat={props.chat}
          />
        )}
        renderChatHeader={(props) => (
          <CustomChatHeader
            {...props}
            chat={chatProps.chat}
            username={chatProps.username}
            secret={chatProps.secret} />
        )}
        renderChatSettings={() => <div className="ce-empty-settings" />}
      />
    </div>
  )
}