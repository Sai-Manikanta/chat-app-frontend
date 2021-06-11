import { useEffect, useContext, useRef } from 'react';
import { IKContext } from 'imagekitio-react';
import Chat from '../Chat';
import { ChatContext } from '../../contexts/ChatContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { darkThemeBg } from '../../utils/bg';
import { baseForest } from '../../utils/baseForest';

function ChatBox() {
    const { chats } = useContext(ChatContext);
    const { isDarkTheme } = useContext(ThemeContext);

    const scrollDiv = useRef();

    useEffect(() => {
        scrollDiv.current?.scrollIntoView({behavior: "smooth"})
    }, [chats])

    return (
        <div 
            className="bg-indigo-100 dark:bg-gray-800 flex-grow p-3 flex-shrink overflow-y-auto scrollbar-hide bg-cover bg-center"
            style={{ backgroundImage: `url("data:image/gif;base64,${isDarkTheme ? darkThemeBg : baseForest}")` }} // , height: '100vh', backgroundSize: 'cover'
        >
                {/* all custom image component childrens accces parent context data */}
                {(chats.length > 0) ? (
                    <IKContext urlEndpoint="https://ik.imagekit.io/42vct06fb">
                            {chats.map(chat => (
                                <div key={chat.id} ref={scrollDiv}>
                                    <Chat chat={chat} />
                                </div>
                            ))}
                    </IKContext>
                ) : (
                    <p>Welcome...</p>
                )}
        </div>
    )
}

export default ChatBox
