import { useState, useContext, useEffect } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import fileExtension from 'file-extension'; 
import axios from 'axios'
import getTime from '../../utils/time'
import { AuthContext } from '../../contexts/AuthContext'
import RenderStatus from './RenderStatus'

function YourStatus() {
    const [uploadStatus, setUploadStatus] = useState(false);
    const [refetch, setRefetch] = useState(false); // toggle and set ui
    const { name } = useContext(AuthContext);
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/statuses')
         .then(res => setStatuses(res.data.data))
         .catch(err => console.log(err.message))
    },[setStatuses, refetch])

    const handleChange = () => {
        setUploadStatus(true);
    }

    const onError = err => {
        console.log("upload Error");
        console.log(err);
        setUploadStatus(false);
    };
    
    const onSuccess = res => {
        
        if(res.fileType === 'image'){
            axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/statuses', {
                name,
                type: 'image',
                src: res.filePath,
                text: '',
                time: getTime()
            })
            .then(res => {
                setRefetch(!refetch);
                setUploadStatus(false);
            })
            .catch(err => {
                setUploadStatus(false);
            })
        } else {
            const videoExtention = fileExtension(res.filePath);
            const allowedExtentions = ['mp4', 'mov'];
            const allowedOrNot = allowedExtentions.includes(videoExtention); // boolean
            if(allowedOrNot){
                axios.post('https://shielded-sea-23165.herokuapp.com/api/v1/statuses', {
                    name,
                    type: 'video',
                    src: res.filePath,
                    text: '',
                    time: '10:00AM'
                })
                .then(res => {
                    setRefetch(!refetch);
                    setUploadStatus(false);
                })
                .catch(err => {
                    setUploadStatus(false);
                })
            }
        }
    }

    return (
        <>
           {uploadStatus && <p>Uploading...</p>}
           {!uploadStatus && (
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
           )}
           <div className="mt-4">
               <div className="flex justify-between space-x-2">
                   {statuses.filter(s => s.name === name).map((status, index) => (
                       <button 
                          key={status._id}
                          className={`${ status._id === selectedStatus._id ? 'bg-indigo-500' : 'bg-indigo-300' } flex-grow text-center rounded-lg text-white focus:outline-none`}
                          onClick={() => setSelectedStatus(status)}
                        >
                           { index + 1 }
                       </button>
                   ))}
               </div>
               { selectedStatus._id && (
                   <div className="mt-4">
                       <RenderStatus 
                          status={selectedStatus} 
                          refetch={refetch} 
                          setRefetch={setRefetch}
                          setSelectedStatus={setSelectedStatus}
                       />
                   </div>
                ) }
           </div>
        </>
    )
}

export default YourStatus