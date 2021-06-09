import { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import Pusher from 'pusher-js';

export const ChatContext = createContext();

function ChatContextProvider({ children }) {
    const [chats, setChats] = useState([]);
    console.log(chats);

    // on intial load
    useEffect(() => {
        axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/chats')
          .then(res => setChats(res.data.data))
          .catch(err => console.log(err.message))
    }, [])

    // on new chat event state update
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

    // on chat delete pusher event
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

    return (
        <ChatContext.Provider value={{
            chats,
            setChats
        }}>
            { children }
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
