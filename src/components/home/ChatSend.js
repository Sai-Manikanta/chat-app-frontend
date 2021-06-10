import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiPaperPlane } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
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
         .then(res => {})
         .catch(err => console.log(err))

        const typerDocId = name === 'Mani' ? '-Mbo8Klzoo2a5cPA8Ht2' : '-Mbo8RyucsohBdWd440U';
        const typingDocRef = firebase.database().ref('Typing').child(typerDocId);
        typingDocRef.update({
            typing: false,
            length: 0
        })
        .then(() => {})
        .catch(err => console.log(err))

        chatInputRef.current.value = '';
    }

    const handleTypingChat = e => {
        const typerDocId = name === 'Mani' ? '-Mbo8Klzoo2a5cPA8Ht2' : '-Mbo8RyucsohBdWd440U';
        const length = e.target.value.length;
        if(length === 1){ // (length % 10) === 0 || 
            const typingDocRef = firebase.database().ref('Typing').child(typerDocId);
            typingDocRef.update({
                typing: true,
                length
            })
            .then(() => {})
            .catch(err => console.log(err))
        }
    }

    const handleChatBlur = () => {
        const typerDocId = name === 'Mani' ? '-Mbo8Klzoo2a5cPA8Ht2' : '-Mbo8RyucsohBdWd440U';
        const typingDocRef = firebase.database().ref('Typing').child(typerDocId);
        typingDocRef.update({
            typing: false,
            length: 0
        })
        .then(() => {})
        .catch(err => console.log(err))
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
                    onBlur={handleChatBlur}
                />
                <motion.button 
                    className="p-1.5 bg-blue-100 rounded focus:outline-none"
                    whileFocus={{ scale: 0.9 }}
                >
                    <BiPaperPlane size="1.5em" className="text-blue-600" />
                </motion.button>
            </form>
        </div>
    )
}

export default ChatSend
