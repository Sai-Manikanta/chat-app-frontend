import { useContext } from 'react';
import axios from 'axios'
import { MdNotificationsActive, MdDeleteSweep } from 'react-icons/md'
import { FiSun } from 'react-icons/fi'
import { FaRegMoon } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import { ThemeContext } from '../../contexts/ThemeContext'
import 'react-toastify/dist/ReactToastify.css';

function Menu() {
   const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

    const smsSuccess = () => toast.success("Success...");
    const smsFailed = () => toast.error("Failed...");

    const deleteSuccess = () => toast.success("Successfully Cleared");
    const deleteFailed = () => toast.error("Failed...");
    const sendSms = () => {
        axios.get('https://shielded-sea-23165.herokuapp.com/api/v1/notify')
         .then(res => {
            smsSuccess()
         })
         .catch(err => {
            smsFailed()
         })
    }

    const deleteChat = () => {
      const chatRef = firebase.database().ref('Chats');
      chatRef.remove()
       .then(() => deleteSuccess())
       .catch(() => deleteFailed())
    }

    return (
        <> 
           <ToastContainer />
           <button 
                className="flex items-center py-2 pl-4 w-44 bg-green-400 text-white rounded-full focus:outline-none shadow border-2 border-white"
                onClick={sendSms}
            >
               <MdNotificationsActive size="1.5em" className="mr-2" />
               Notify bey... 
            </button>
            <button 
                className="flex items-center py-2 pl-4 w-44 bg-green-400 text-white rounded-full focus:outline-none shadow border-2 border-white mt-3"
                onClick={deleteChat}
            >
               <MdDeleteSweep size="1.5em" className="mr-2" />
               Clear Chat 
            </button>
            <button 
                className="flex items-center py-2 pl-4 w-44 bg-green-400 text-white rounded-full shadow border-2 border-white mt-3 focus:outline-none"
                onClick={() => setIsDarkTheme(!isDarkTheme)}
            >
               {isDarkTheme ? <FiSun size="1.5em" className="mr-2" /> : <FaRegMoon size="1.5em" className="mr-2" /> }
               {isDarkTheme ? 'Set Light' : 'Set Dark'}
            </button>
        </>
    )
}

export default Menu
