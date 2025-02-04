import React, { Children } from 'react'
import { Tabs } from 'antd'
import MovieList from './MovieList'
import TheaterApproveList from './TheaterApproveList'

function Admin() {

    const tabItems = [
        {
            key: "1",
            label: "Movies",
            children: <MovieList/>
        },
        {
            key: "2",
            label: "Theaters",
            children: <TheaterApproveList/>
        }
    ]
  return (
    <div className='margin-10 bg-white-100 p-20 rounded-lg' >
        <Tabs items={tabItems}></Tabs>
    </div>
  )
}

export default Admin