import React from 'react'
import Head from "next/head";
import Header from './Header';

export const Layout = ({children}) => {
  return (
    <>
        <Head>
            <title>NodeSend</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        
        <div className='bg-gray-100 min-h-screen'>
            <div className='container mx-auto'>
                <Header />
                <main className='mt-20'>
                    {children}
                </main>
            </div>
        </div>
        
    </>
  )
}
