import axios from 'axios'
import ReactPlayer from 'react-player'

function Video({ status, refetch, setRefetch, setSelectedStatus, isPartnerStatus }){
    const deleteStatus = id => {
        axios.delete(`https://shielded-sea-23165.herokuapp.com/api/v1/statuses/${id}`)
         .then(res => {
            setRefetch(!refetch)
            setSelectedStatus({})
         })
         .catch(err => console.log(err))
    }

    return (
        <>
          <ReactPlayer 
            url={`https://ik.imagekit.io/42vct06fb${status.src}`} 
            controls 
            width="640"
            height="360"
          />
          <p className="mt-2 text-sm">
              Uploaded at {status.time}
          </p>
          {status.seenByPartner && !isPartnerStatus && (
            <p className="text-green-500 mt-1">
                Seen by { status.name === 'Mani' ? 'Chinnu' : 'Mani' } at { status.seenByPartnerTime }
            </p>
           )}
           {!isPartnerStatus && (
               <button 
                    className="bg-red-500 py-1 px-2 text-sm text-white rounded mt-2"
                    onClick={() => deleteStatus(status._id)}
                >
                Delete Status
            </button>
           )}
        </>
    )
}

export default Video