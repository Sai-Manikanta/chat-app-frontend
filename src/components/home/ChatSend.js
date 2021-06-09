import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiPaperPlane } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import axios from 'axios';
import getTime from '../../utils/time'
import { CgSpinnerTwo } from 'react-icons/cg';
import { AuthContext } from '../../contexts/AuthContext';
import { UploadContext } from '../../contexts/UploadContext';
import firebase from '../../utils/firebase';

function ChatSend() {
    const { name } = useContext(AuthContext);
    const { uploadStatus } = useContext(UploadContext);
    
    const chatInputRef = useRef();

    const handleSumbit = e => {
        e.preventDefault();
        const text = chatInputRef.current.value;

        if(!text){
            return null
        }

        const chatRef = firebase.database().ref('Chats');
        chatRef.push({ name, type: "text", text, time: getTime() })

        axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/typing', {
            name: name,
            typing: false,
            length: 0
        })
        .then(res => {})
        .catch(err => console.log(err.message))

        chatInputRef.current.value = '';
    }

    const handleTypingChat = e => {
        const length = e.target.value.length;
        if((length % 5) === 0 || length === 1){
            axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/typing', {
                name,
                typing: true,
                length
            })
            .then(res => {})
            .catch(err => console.log(err.message))
        }
    }

    return (
        <div className="flex items-center py-2 px-2 flex-shrink-0">

            { uploadStatus ? (
                    <div className="ml-1 mr-4">
                       <CgSpinnerTwo size="1.5em" className="text-blue-600 animate-spin" /> 
                    </div>
            ) : (
                    <Link to="/feachers/image-upload" className="ml-1 mr-4">
                        <MdPermMedia size="1.5em" className="text-blue-600" />
                    </Link> 
            ) }

            <form onSubmit={handleSumbit} className="flex flex-grow"> 
                <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-grow outline-none text-gray-800"
                    ref={chatInputRef}
                    onChange={handleTypingChat}
                />
                <button className="p-1.5 bg-blue-100 rounded">
                    <BiPaperPlane size="1.5em" className="text-blue-600" />
                </button>
            </form>
        </div>
    )
}

export default ChatSend
