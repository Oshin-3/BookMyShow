import React from 'react'
import { Table, Button} from 'antd'


function MovieList() {

    const tableHeadings = [
        {
            title: " ",
        },
        {
            title: "Movie Name",
            dataIndex: "movieName"
        },
        {
            title: "Genre",
            dataIndex: "genre"
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate"
        },
        {
            title: "Action"
        }
    ]
  return (
    <div>
        <Table columns={tableHeadings}></Table>
    </div>
  )
}

export default MovieList