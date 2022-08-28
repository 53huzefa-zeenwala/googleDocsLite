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
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-[90%] mx-4 md:w-[70%] lg:w-[50%]">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-2.5 py-2.5  outline-none focus-within:text-gray-500 focus-within:shadow-md" placeholder="Search" />
            </div>
            <div className='flex gap-3 md:gap-5'>
                <button>
                    <MdOutlineApps className='text-gray-500 text-4xl hidden md:inline' />
                </button>
                <button className='h-10 aspect-square rounded-full relative overflow-hidden border-[2px] border-blue-500 hover:shadow-md focus:shadow-md focus:border-blue-900' onClick={signOutGoogle}>
                    {currentUser?.photoURL && <img src={currentUser.photoURL} className="w-full h-full" alt={currentUser?.displayUser} loading='lazy' />}
                </button>
            </div>
        </header>
    )
}

export default Header