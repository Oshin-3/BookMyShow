import React from 'react'
import { Tabs } from 'antd'
import TheaterList from './TheaterList'

function Partner() {

    const tabItems = [
        {
            key: 1, 
            label: "Theaters",
            children: <TheaterList/>
        },
        
    ]

  return (
    <div className='margin-10 bg-white-100 p-20 rounded-lg'>
        <Tabs items={tabItems}></Tabs>
    </div>
  )
}

export default Partner