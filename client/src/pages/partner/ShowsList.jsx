import React, { useEffect, useState } from 'react'
import { Table, Button} from 'antd'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { GetAllShowsByTheater } from '../../api/showApi'
import { GetTheaterById } from '../../api/theaterApi'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import ShowFormModal from './ShowFormModal'
import DeleteShowModal from './DeleteShowModal'

function ShowsList() {

  const [shows, setShows] = useState(null)
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)
  const [isShowFormModalOpen, setIsShowFormModalOpen] = useState(false)
  const [isShowDeleteModalOpen, setIsShowDeleteModalOpen] = useState(false)
  const [formType, setFormType] = useState("add")
  const [selectedMovie, setSelectedMovie] = useState(null)

  let {theaterId} = useParams()
  const dispatch = useDispatch()



  const getShowsByTheater = async () => {
    try {
      dispatch(ShowLoader())

      console.log("theaterId => ", theaterId)
      const res = await GetAllShowsByTheater(theaterId)
      console.log(res.data)
      setShows(res.data)

      dispatch(HideLoader())
    } catch (error) {
      
    }
  }

  const getTheater = async () => {
    try {
      dispatch(ShowLoader())

      console.log("theaterId => ", theaterId)
      const res = await GetTheaterById(theaterId)
      console.log(res.data)
      setSelectedTheater(res.data)

      dispatch(HideLoader())
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getTheater()
    getShowsByTheater()
  }, [])
  const tableHeadings = [
    {
        title: " ",
        render: (text, data) => {
            return (
                <img 
                    width="75"
                    height="115"
                    
                    src={data.movie.poster}
                    alt={data.movie.movieName}
                />
            )
        }
    },
    {
        title: "Movie Name",
        render: (text, data) => {
          return data.movie.movieName
        }
    },
    {
      title: "Show Name",
      dataIndex: "showName"
    },
    {
        title: "Duration",
        render: (text, data) => {
            return `${data.movie.duration} mins`
        }
    },
    {
        title: "Show Date",
        dataIndex: "date",
        render: (text, data) => {
          return moment(data.date).format("DD-MM-YYYY")
        }
    },
    {
        title: "Time",
        dataIndex: "time",
    },
    {
        title: "auditoriumName",
        dataIndex: "auditoriumName"
    },
    {
        title: "Action",
        render: (text, data) => {
            return (
                <div>
                    <Button color='primary' variant='outlined'  className='margin-10' onClick={() =>{
                      setIsShowFormModalOpen(true)
                      setSelectedShow({...data, date: moment(data.date).format("YYYY-MM-DD")})
                      setSelectedMovie(data.movie)
                      setFormType("edit")
                    }}>
                        <EditOutlined/>
                    </Button>
                    
                    <Button color='danger' variant='solid' onClick={() => {
                      setIsShowDeleteModalOpen(true)
                      setSelectedShow(data)
                    }}>
                        <DeleteOutlined/>
                    </Button>
                </div>
            )
        }
    }
]

console.log("theater ", selectedTheater)

  return (
    <>
      <div className='d-flex'>
        {
          selectedTheater ? (
            <h2 className='text-red-500'>{selectedTheater.theaterName}</h2>
          ) : (<h1 className='text-red-500'></h1>)
        }
           
      </div>
      <Table dataSource={shows} columns={tableHeadings}></Table>

      {
        isShowFormModalOpen && (
          <ShowFormModal
            isShowFormModalOpen={isShowFormModalOpen}
            setIsShowFormModalOpen={setIsShowFormModalOpen}
            selectedTheater={selectedTheater}
            setSelectedTheater={setSelectedTheater}
            formType={formType}
            setFormType={setFormType}
            selectedShow={selectedShow}
            setSelectedShow={setSelectedShow}
            getShowsByTheater={getShowsByTheater}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )
      }

      {
        isShowDeleteModalOpen && (
          <DeleteShowModal
            isShowDeleteModalOpen = {isShowDeleteModalOpen}
            setIsShowDeleteModalOpen = {setIsShowDeleteModalOpen}
            selectedShow={selectedShow}
            setSelectedShow={setSelectedShow}
            getShowsByTheater = {getShowsByTheater}
          />
        )
      }
    </>
  )
}

export default ShowsList