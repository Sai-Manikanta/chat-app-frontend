import firebase from 'firebase'

function Image({ status, refetch, setRefetch, setSelectedStatus, isPartnerStatus }){
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
          <img
            src={`https://ik.imagekit.io/42vct06fb${status.src}`}
            alt={status.src}
            className=" mx-auto rounded"
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
                    onClick={() => deleteStatus(status.id)}
                >
                    Delete Status
                </button>
           )}
        </>
    )
}

export default Image