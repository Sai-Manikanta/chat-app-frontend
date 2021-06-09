import { useContext } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import fileExtension from 'file-extension'; 
import { AuthContext } from '../contexts/AuthContext';
import { UploadContext } from '../contexts/UploadContext';

function ImageUpload() {
    const { name } = useContext(AuthContext)
    const { setUploadStatus } = useContext(UploadContext);
    
    const history = useHistory();

    const handleChange = () => {
        setUploadStatus(true);
        history.push('/')
    }

    const onError = err => {
        console.log("upload Error");
        console.log(err);
        setUploadStatus(false);
    };
    
    const onSuccess = res => {
        console.log(res);
        
        if(res.fileType === 'image'){
            axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/chats', {
                    name,
                    type: "image",
                    src: res.filePath,
                    time: '10:00 AM'
            })
            .then(res => {
                console.log(res.data);
                setUploadStatus(false);
            })
            .catch(err => {
                console.log(err.message);
                setUploadStatus(false);
            })
        } else {
            const videoExtention = fileExtension(res.filePath);
            const allowedExtentions = ['mp4', 'mov'];
            const allowedOrNot = allowedExtentions.includes(videoExtention); // boolean
            if(allowedOrNot){
                axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/chats', {
                    name,
                    type: "video",
                    src: res.filePath,
                    time: '10:00 AM'
                })
                .then(res => {
                    console.log(res.data);
                    setUploadStatus(false);
                })
                .catch(err => {
                    console.log(err.message);
                    setUploadStatus(false);
                })
            }
        }
    };


    return (
        <div>
            <IKContext 
                publicKey="public_6Z7p3M/rOoplkEAkbXolSXM41IA=" 
                urlEndpoint="http://localhost:3000/" 
                authenticationEndpoint="https://shielded-sea-23165.herokuapp.com/auth" 
            >
                <IKUpload
                    onError={onError}
                    onSuccess={onSuccess}
                    onChange={handleChange}
                />
            </IKContext>
        </div>
    )
}

export default ImageUpload
