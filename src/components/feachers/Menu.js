import axios from 'axios'
import { MdNotificationsActive, MdDeleteSweep } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu() {

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
        axios.delete('https://shielded-sea-23165.herokuapp.com/api/v1/chats')
         .then(res => {
            deleteSuccess()
         })
         .catch(err => {
            deleteFailed()
         })
    }

    return (
        <> 
           <ToastContainer />
           <button 
                className="flex items-center py-2 pl-4 w-44 bg-green-400 text-white rounded focus:outline-none shadow border-4 border-white"
                onClick={sendSms}
            >
               <MdNotificationsActive size="1.5em" className="mr-2" />
               Notify bey... 
            </button>
            <button 
                className="flex items-center py-2 pl-4 w-44 bg-green-400 text-white rounded focus:outline-none shadow border-4 border-white mt-3"
                onClick={deleteChat}
            >
               <MdDeleteSweep size="1.5em" className="mr-2" />
               Clear Chat 
            </button>
        </>
    )
}

export default Menu
