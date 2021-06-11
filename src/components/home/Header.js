import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CgMenuRightAlt } from "react-icons/cg"
import { AuthContext } from '../../contexts/AuthContext'
import firebase from '../../utils/firebase'

function Header() {
    const [typing, setTyping] = useState({});
    const { name } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const opoSiteTyperDocIndex = name === 'Mani' ? 1 : 0;

        const typingRef = firebase.database().ref('Typing'); // .child(opoSiteTyperDocId)
        typingRef.on('value', (snapshot) => {
            const typers = snapshot.val();
            const typersList = [];
            for(let id in typers){
                typersList.push({ id, ...typers[id]});
            }
            setTyping(typersList[opoSiteTyperDocIndex])
        })
    }, []) 

    return (
        <div className="bg-indigo-500  flex px-3 py-3 items-center text-white justify-between flex-shrink-0 border-white shadow">
            {typing.typing && (
                <div>{`${typing.name} is typing...`}</div>
            )}
            {!typing.typing && (
                <div>Welcome</div>
            )}
            <button onClick={() => history.push('/feachers/menu')}>
                <CgMenuRightAlt size="2em" />
            </button>
        </div>
    )
}

export default Header
