import Image from 'next/image'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const {loginWithGoogle} = useAuth()

    const signInWithGoogle = async () => {
        try {
            await loginWithGoogle()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen' >
            <div className='relative h-48 w-36' >
                <Image src={'/logo.png'} layout='fill' objectFit='cover' priority={true}/>
            </div>
            <button onClick={signInWithGoogle} style={{boxShadow: "2px 2px 8px 0px black"}} className='w-40 mt-8 bg-blue-600 px-2 py-2 rounded-md text-white font-semibold text-xl hover:scale-105 transition-all'>
                Login
            </button>
        </div>
    )
}

export default Login