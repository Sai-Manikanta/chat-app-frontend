import { useEffect, useContext, useRef } from 'react';
import { IKContext } from 'imagekitio-react';
import Chat from '../Chat';
import { ChatContext } from '../../contexts/ChatContext'

function ChatBox() {
    const { chats } = useContext(ChatContext);

    const scrollDiv = useRef();

    useEffect(() => {
        scrollDiv.current?.scrollIntoView({behavior: "smooth"})
    }, [chats])

    return (
        <div className="bg-indigo-100 flex-grow p-3 flex-shrink overflow-y-auto scrollbar-hide">
                {/* all custom image component childrens accces parent context data */}
                {(chats.length > 0) ? (
                    <IKContext urlEndpoint="https://ik.imagekit.io/42vct06fb">
                            {chats.map(chat => (
                                <div key={chat._id} ref={scrollDiv}>
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
