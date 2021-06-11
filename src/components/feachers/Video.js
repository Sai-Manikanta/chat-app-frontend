import ReactPlayer from 'react-player'
import firebase from 'firebase'

function Video({ status, refetch, setRefetch, setSelectedStatus, isPartnerStatus }){
    const deleteStatus = id => {
        const statusesRef = firebase.database().ref('Statuses').child(id);
        statusesRef.remove()
         .then(() => {
            setRefetch(!refetch)
            setSelectedStatus({})
         })
         .catch(err => {
            console.log(err)
         })
    }

    return (
        <>
          <div className="rounded-sm overflow-hidden">
            <ReactPlayer 
                url={`https://ik.imagekit.io/42vct06fb${status.src}`} 
                controls 
                width="640"
                height="360"
            />
          </div>
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
                    onClick={() => deleteStatus(status.id)}
                >
                Delete Status
            </button>
           )}
        </>
    )
}

export default Video