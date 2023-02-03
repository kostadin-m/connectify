import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
import { useThemeContext } from '../hooks/useThemeContext'

//styles
import '../chat.css'

//custom components
import CustomChatCard from '../components/chat-components/CustomChatCard'
import CustomChatHeader from '../components/chat-components/CustomChatHeader'

export default function Messages() {
    const projectID = "aa3fb12c-c258-4a8e-b41b-20c485a583fc"
    const chatProps = useMultiChatLogic(projectID, 'kostadin', '123456')
    const { theme } = useThemeContext()
    return (
        <div className={theme} style={{ marginTop: '70px', height: 'calc(100vh - 70px)' }}>
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
