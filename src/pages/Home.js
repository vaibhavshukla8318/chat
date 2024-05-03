import React from 'react'
import homeStyle from '../css/home.module.css'
import ChatApp from '../components/Chat'

const Home = () => {
  return (
    <div className={homeStyle.home}>
       <ChatApp/>
    </div>
  )
}

export default Home