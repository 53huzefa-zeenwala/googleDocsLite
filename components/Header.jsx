import Image from 'next/image'
// import {IoAppsSharp} from 'react-icons/io'
import { MdOutlineApps } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const { currentUser, logout } = useAuth()
    const signOutGoogle = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className='flex sticky top-0 z-50 items-center px-4 py-2 shadow-md bg-white justify-between'>
            <div className='flex justify-center gap-2 md:gap-5'>
                <button className="relative aspect-square h-8 p-2">
                    <Image src={'/logo.png'} layout='fill' objectFit='contain' />
                </button>
                <h1 className='text-gray-700 text-2xl font-semibold hidden md:inline'>Docs</h1>
            </div>
        
            <div className='flex gap-3 md:gap-5'>
                <button>
                    <MdOutlineApps className='text-gray-500 text-4xl hidden md:inline' />
                </button>
                <button className='h-10 aspect-square rounded-full relative overflow-hidden border-[2px] border-blue-500 hover:shadow-md focus:shadow-md focus:border-blue-900 showLogoutContext' onClick={signOutGoogle}>
                    {currentUser?.photoURL && <img src={currentUser.photoURL} className="w-full h-full" alt={currentUser?.displayUser} loading='lazy' />}
                </button>
                <h5 className='absolute -bottom-5 right-2 shadow-md bg-gray-100 py-0.5 px-1.5 rounded-md text-sm font-medium logoutContext'>Logout</h5>
            </div>
        </header>
    )
}

export default Header