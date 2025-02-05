import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, Button} from 'antd'
import { GetAllMovies } from '../../api/movieApi'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { SetMovie } from '../../redux/movieSlice'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import MovieFormModal from './MovieFormModal'
import { DeleteMovieModal } from './DeleteMovieModal'


function MovieList() {

    const dispatch = useDispatch()
    const { movie } = useSelector(state => state.movies)

    const [isMovieFormModalOpen, setIsMovieFormModalOpen] = useState(false)
    const [isDeleteMovieModalOpen, setIsDeleteMovieModalOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [formType, setFormType] = useState("add")

    const getAllMovies = async () => {
        try {
            dispatch(ShowLoader())
            const res = await GetAllMovies()
            console.log("Get all Movies-> ", res.data)
            const allMovies = res.data
            allMovies.map(function (item) {
                return {...item, key: `movie${item.id}`}
            })
            console.log("allmovies ", allMovies)
            dispatch(SetMovie(allMovies))
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    const tableHeadings = [
        {
            title: " ",
            render: (text, data) => {
                return (
                    <img 
                        width="75"
                        height="115"
                        
                        src={data.poster}
                        alt={data.movieName}
                    />
                )
            }
        },
        {
            title: "Movie Name",
            dataIndex: "movieName",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text, data) => {
                return `${text} mins`
            }
        },
        {
            title: "Genre",
            dataIndex: "genre",
            render: (text, data) => {
                const genre = data.genre;
                //console.log(genre); // Debugging purpose
                return genre?.join(", "); // Convert array to space-separated string
            }
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, data) => {
                return moment(data.releaseDate).format("DD-MM-YYYY")
            }
        },
        {
            title: "Action",
            render: (text, data) => {
                return (
                    <div>
                        <Button color='primary' variant='outlined'  className='margin-10' onClick={() => {
                            setIsMovieFormModalOpen(true)
                            console.log("selected data-> ", data)
                            setSelectedMovie(data)
                            setFormType("edit")
                        }}>
                            <EditOutlined/>
                        </Button>
                        
                        <Button color='danger' variant='solid'>
                            <DeleteOutlined/>
                        </Button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getAllMovies()
    }, [])

    //console.log("Movies -> ", movie)

  return (
    <div>
        <div className='d-flex justify-content-end'>
            <Button className='margin-10' type='primary' onClick={() => {
                setFormType("add")
                setIsMovieFormModalOpen(true)
            }}>Add Movie <PlusOutlined/></Button>
        </div>
        <Table dataSource={movie} columns={tableHeadings}></Table>

        {
            isMovieFormModalOpen && (
                <MovieFormModal 
                    isMovieFormModalOpen = {isMovieFormModalOpen}
                    setIsMovieFormModalOpen = {setIsMovieFormModalOpen}
                    formType = {formType}
                    setFormType = {setFormType}
                    getAllMovies = {getAllMovies}
                    selectedMovie = {selectedMovie}
                    setSelectedMovie = {setSelectedMovie}
                />
            )
        }
    </div>
  )
}

export default MovieList