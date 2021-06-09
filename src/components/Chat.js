import ImageChat from "./ImageChat";
import TextChat from "./TextChat";
import VideoChat from "./VideoChat"

function Chat({ chat }) {
    switch (chat.type) {
        case 'text':
              return <TextChat chat={chat} />
            break;
        case 'image':
              return <ImageChat chat={chat} />
            break;
        case 'video':
              return <VideoChat chat={chat} />
            break;
        default:
              return null
            break;
    }
}

export default Chat
