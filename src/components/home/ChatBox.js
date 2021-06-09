import { useEffect, useState, useRef } from 'react';
import { IKContext } from 'imagekitio-react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Chat from '../Chat';

function ChatBox() {
    const [chats, setChats] = useState([]);

    const scrollDiv = useRef();

    useEffect(() => {
        axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/chats')
          .then(res => setChats(res.data.data))
          .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        var pusher = new Pusher('75838d36413b7d5761a0', {
            cluster: 'ap2'
        });
      
        var channel = pusher.subscribe('chat');
        channel.bind('newchat', function(data) {
            console.log(data);
            setChats([...chats, { ...data }]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [chats])

    useEffect(() => {
        var pusher = new Pusher('75838d36413b7d5761a0', {
            cluster: 'ap2'
        });
      
        var channel = pusher.subscribe('chat');
        channel.bind('deletedchats', function(data) {
            setChats([]);
        });

        return () => {
            channel.unbind();
            channel.unsubscribe();
        }
    }, [chats])

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
