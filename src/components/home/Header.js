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
        <div className={`bg-white dark:bg-gray-800 ${name === 'Mani' ? 'text-indigo-500' : 'text-pink-500'} tracking-wide dark:text-white  flex px-3 py-3 items-center justify-between flex-shrink-0 shadow-xl`}>
            {typing.typing && (
                <div>{`${typing.name} is typing...`}</div>
            )}
            {!typing.typing && (
                <div className="font-bold">Welcome bey</div>
            )}
            <button onClick={() => history.push('/feachers/menu')}>
                <CgMenuRightAlt size="2em" className={`${name === 'Mani' ? 'text-indigo-500' : 'text-pink-500'} dark:text-white`} />
            </button>
        </div>
    )
}

export default Header
