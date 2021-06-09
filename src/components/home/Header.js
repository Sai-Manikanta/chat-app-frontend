import { useState, useEffect, useContext } from 'react'
import Pusher from 'pusher-js';
import { useHistory } from 'react-router-dom'
import { CgMenuRightAlt } from "react-icons/cg"
import { AuthContext } from '../../contexts/AuthContext'

function Header() {
    const [typing, setTyping] = useState({});
    const { name } = useContext(AuthContext);
    const typer = name === 'Mani' ? 'Chinnu' : 'Mani';
    const history = useHistory();

    useEffect(() => {
        var pusher = new Pusher('75838d36413b7d5761a0', {
            cluster: 'ap2'
        });
      
        var channel = pusher.subscribe('typing');
        channel.bind(`${typer}Typing`, function(data) { // client-
            setTyping(data);
            //console.log(data)
        });

        return () => {
            channel.unbind();
            channel.unsubscribe();
        }
    }, [typer]) // typing, 

    return (
        <div className="bg-indigo-500 flex px-3 py-2 items-center text-white justify-between flex-shrink-0">
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
