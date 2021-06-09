import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IKImage } from 'imagekitio-react'

function ImageChat({ chat }) {
    const { name } = useContext(AuthContext);

    return (
        <div className={`flex ${chat.name === name ? 'justify-end' : ''} ${chat.name === name ? 'pl-16' : ''} ${chat.name !== name ? 'pr-16' : ''} mb-4`}>
            <span className={`p-1 ${chat.name === 'Mani' && 'bg-indigo-300'} ${chat.name === 'Chinnu' && 'bg-pink-300'} rounded`}>
                <IKImage
                    path={chat.src}
                    transformation={[{
                        //"height": "240",
                        "width": "240"
                    }]}
                    loading="lazy"
                    lqip={{ active: true }}
                />
            </span>
        </div>
    )
}

export default ImageChat
