import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js';
import { AuthContext } from '../../contexts/AuthContext'
import getTime from '../../utils/time'
import RenderStatus from './RenderStatus'

function PartnerStatus() {
    const { name } = useContext(AuthContext);
    const [statuses, setStatuses] = useState([]);
    const [refetch, setRefetch] = useState(false); // toggle and set ui
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/statuses')
         .then(res => setStatuses(res.data.data))
         .catch(err => console.log(err.message))
    },[setStatuses])

    useEffect(() => {
        var pusher = new Pusher('75838d36413b7d5761a0', {
            cluster: 'ap2'
        });
      
        var channel = pusher.subscribe('status');
        channel.bind('newstatus', function(data) {
            setStatuses([...statuses, { ...data }]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [statuses])

    const updateToSeenStatus = (id, seenByPartner) => {
        if(seenByPartner) return null

        axios.patch(`https://shielded-sea-23165.herokuapp.com/api/v1/statuses/${id}`, {
            seenByPartner: true,
            seenByPartnerTime: getTime()
        })
        .then(res => {})
        .catch(err => console.log(err.message))
    }
    
    return (
        <div>
            {(statuses.filter(s => s.name !== name).length === 0) && (
                <p>No Statuses from { name === 'Mani' ? 'Chinnu' : 'Mani' }</p>
            )}
            <div className="flex justify-between space-x-2">
                {statuses.filter(s => s.name !== name).map((status, index) => (
                    <button 
                        key={status._id}
                        className={`${ status._id === selectedStatus._id ? 'bg-indigo-500' : 'bg-indigo-300' } flex-grow text-center rounded-lg text-white focus:outline-none`}
                        onClick={() => {
                            setSelectedStatus(status)
                            updateToSeenStatus(status._id, status.seenByPartner)
                        }}
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
                        isPartnerStatus={true}
                    />
                </div>
            )}
        </div>
    )
}

export default PartnerStatus

