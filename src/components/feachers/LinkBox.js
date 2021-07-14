import { useState, useEffect, useRef } from 'react'
import firebase from '../../utils/firebase'

function LinkBox() {
    const textInputRef = useRef();
    const linkInputRef = useRef();

    const [links, setLinks] = useState([]);

    useEffect(() => {
        const linksRef = firebase.database().ref("Links");

        linksRef.on('value', (snapshot) => {
            const links = snapshot.val();
            const linksList = [];
            for(let id in links){
                linksList.push({ id, ...links[id]});
            }
            setLinks(linksList);
        })
    }, [])

    const handleSumbit = e => {
        e.preventDefault();

        const text = textInputRef.current.value;
        const url = linkInputRef.current.value;

        if(text.length === 0 || url.length === 0) return

        const link = { text, url };
        const linksRef = firebase.database().ref("Links");
        linksRef.push(link);

        textInputRef.current.value = "";
        linkInputRef.current.value = "";
    }

    return (
        <div className="mt-6">
            <div>
               <h3 className="text-blue-600 text-lg mb-2">
                  Links bey...
               </h3>
               <form onSubmit={handleSumbit}>
                  <input 
                     type="text" 
                     placeholder="Text" 
                     className="px-2 py-1 mb-2 w-full rounded outline-none"
                     ref={textInputRef}
                  />
                  <input 
                     type="text" 
                     placeholder="Url" 
                     className="px-2 py-1 mb-2 w-full rounded outline-none"
                     ref={linkInputRef}
                  />
                  <button className="bg-green-500 w-full px-4 py-1 rounded text-white float-right">
                     Add
                  </button>
                  <div className="clear-right"></div>
               </form>
            </div>
            <div>
                {links.length > 0 && (
                    <div className="bg-white mt-3 p-3 rounded space-y-1">
                        {links.map(link => (
                            <a href={link.url} key={link.id} className="text-blue-500 block underline">
                                {link.text}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LinkBox
