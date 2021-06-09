import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function TextChat({ chat }) {
    const [showTime, setShowTime] = useState(false);
    const { name } = useContext(AuthContext);
    
    // hide show time after 3 sec
    useEffect(() => {
        if(showTime){
            setTimeout(() => {
                setShowTime(false)
            }, 3000)
        }
    },[showTime])

    return (
        <div className={`flex flex-col  ${chat.name === name ? 'items-end' : 'items-start'} ${chat.name === name ? 'pl-16' : ''} ${chat.name !== name ? 'pr-16' : ''} mb-1`}>
            <p 
                className={`text-white mb-1 inline-block ${chat.name === 'Mani' ? 'bg-indigo-500' : 'bg-pink-500'}  ${(chat.text.length > 24) ? 'rounded-xl' : 'rounded-full'} ${(chat.text.length > 24) ? 'px-4' : 'px-3'} ${(chat.text.length > 24) ? 'py-3' : 'py-2'}`}
                onClick={() => setShowTime(true)}
            >
                {chat.text} 
            </p>
            <span className={`mb-1 text-xs text-gray-700  ${showTime ? 'block' : 'hidden'}`}> 
                {chat.time}
            </span>
        </div>
    )
}
/// ${chat.name === 'Mani' ? 'text-indigo-500' : 'text-pink-500'}
export default TextChat
