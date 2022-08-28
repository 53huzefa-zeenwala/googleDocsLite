import { useRouter } from 'next/router';
import { BsFillPeopleFill } from 'react-icons/bs';
import Image from "next/image";
import { useAuth } from '../context/AuthContext';

function DocumentHeader({ fileName }) {
    const { push } = useRouter();
    const { currentUser, logout } = useAuth()
    const signOutGoogle = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="flex justify-between items-center px-2 pb-2 py-2 bg-white">
            <button
                className="relative aspect-square h-10 p-2"
                onClick={() => push("/")}
            >
                <Image src={"/logo.png"} layout="fill" objectFit="contain" />
            </button>
            <div className="flex-grow px-2">
                <h2 className="pb-1 font-medium capitalize">{fileName}</h2>
                <div className="flex items-center text-sm space-x-1 -ml-1 h-5 text-gray-600">
                    <p className="option">File</p>
                    <p className="option">Edit</p>
                    <p className="option">View</p>
                    <p className="option">Insert</p>
                    <p className="option">Format</p>
                    <p className="option">Tools</p>
                </div>
            </div>
            <button className="text-white bg-blue-400 hover:bg-blue-500 hover:shadow-md px-3 py-2 md:flex items-center gap-2.5 font-medium rounded-md transition-all hidden mr-5">
                <BsFillPeopleFill className="text-2xl text-white" /> Share
            </button>
            <button className='h-11 aspect-square rounded-full relative overflow-hidden border-[2px] border-blue-500 hover:shadow-md focus:shadow-md focus:border-blue-900' onClick={signOutGoogle}>
                {currentUser?.photoURL && <img src={currentUser.photoURL} className="w-full h-full" alt={currentUser?.displayUser} loading='lazy' />}
            </button>
        </header>
    )
}

export default DocumentHeader