import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ReactPlayer from 'react-player'

function VideoChat({ chat }) {
    const { name } = useContext(AuthContext);
    
    return (
        <div className={`flex ${chat.name === name ? 'justify-end' : ''} ${chat.name === name ? 'pl-16' : ''} ${chat.name !== name ? 'pr-16' : ''} mb-4`}>
            <span className={`p-1 ${chat.name === 'Mani' && 'bg-indigo-300'} ${chat.name === 'Chinnu' && 'bg-pink-300'} rounded`}>
                <ReactPlayer 
                    url={`https://ik.imagekit.io/42vct06fb${chat.src}`} 
                    controls 
                    width="640"
                    height="360"
                />
            </span>
        </div>
    )
}

export default VideoChat
