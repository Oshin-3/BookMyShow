import React, { useEffect , useState} from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, Table ,message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { SetMovie } from '../../redux/movieSlice';
import { AddShows, UpdateShow, GetAllShowsByTheater } from '../../api/showApi';
import { GetAllMovies } from '../../api/movieApi'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteShowModal from './DeleteShowModal'
import moment from 'moment';

const ShowFormModal = ({
    isShowFormModalOpen,
    setIsShowFormModalOpen,
    selectedTheater,
    setSelectedTheater,
    
    selectedMovie,            
    setSelectedMovie
}) => {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const [allMovies, setAllMovies] = useState(null)
    const [shows, setShows] = useState(null)
    const [view, setView] = useState("table")
    const [showsByTheater, setShowsByTheater] = useState(null)
    const [isDeleteShowModalOpen, setIsDeleteShowModalOpen]  = useState(false)
    const [selectedShow, setSelectedShow] = useState(null)

    const showsTableHeading = [
        {
            title: "Show Name",
            dataIndex: "showName"
        },
        {
            title: "Show Date",
            dataIndex: "date",
            render: (text, data) => {
                return moment(text).format("YYYY-MM-DD")
            }
        },
        {
            title: "Show Time",
            dataIndex: "time"
        },
        {
            title: "Movie",
            dataIndex: "movie",
            render: (text, data) => {
                return data.movie.movieName
            }
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats"
        },
        {
            title: "Available Seats",
            dataIndex: "bookedSeats",
            render: (text, data) => {
                return data.totalSeats - data.bookedSeats.length
            }
        },
        {
            title: "Ticket Price",
            dataIndex: "price"
        },
        {
            title: "Action",
            width: "20%",
            render: (text, data) => {
                return (
                    <>
                        <div>
                            <Button color="primary" variant='outlined' className='margin-10'
                                onClick={() => {
                                    setView("edit")
                                    setSelectedShow(data)
                                }}>
                                <EditOutlined />
                            </Button>
                            <Button color="danger" variant='solid'
                                onClick={() => {
                                    setIsDeleteShowModalOpen(true)
                                    setSelectedShow(data)
                                }}
                            >
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </>
                )
            }
        }
    ]

    const handleCancel = () => {
        
        setView("table")
    }

    const handleCrossCancel = () => {
        setSelectedTheater(null)
        setIsShowFormModalOpen(false)
    }

    const getShowsByTheater = async () => {
        console.log("Theater Id: ", selectedTheater)
        try {
            dispatch(ShowLoader)

            const res = await GetAllShowsByTheater(selectedTheater._id)
            if (res.success)
            {
                setShowsByTheater(res.data)
            }
            else {
                messageApi.open({
                    type: "error",
                    content: res.message
                })
            }

            dispatch(HideLoader)
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: "error",
                content: "Some error occured"
            })
        }
    }

    const fetchMovies = async () => {
        try {

            dispatch(ShowLoader())
            const res = await GetAllMovies()
            setAllMovies(res.data)
            
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    const onFinish = async (values) => {
        try {
            //console.log("values, ", values)
            dispatch(ShowLoader())

            let res = null

            if (view === "form")
            {
                console.log("add show")
                res = await AddShows({...values, theater: selectedTheater._id})
            }
            else{
                console.log("update show")
                res = await UpdateShow({...values, id: selectedShow._id})
            }
            console.log(res)
            if (res.success){
                messageApi.open({
                    type: 'success',
                    content: res.message
                })
                const show = res.data
                setShows(show)
                setView("table")
                
            }
            else{
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }

            //setSelectedTheater(null)
            // setTimeout(() => {
            //     setIsShowFormModalOpen(false)
            // }, 1005)
            //getShowsByTheater()
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getShowsByTheater()
        fetchMovies()
        
    },[dispatch])

    //console.log('selected movie ' , selectedMovie)
  return (
    <>
    {contextHolder}
        <Modal centered
            title={selectedTheater ? selectedTheater.theaterName : ""}
            open={isShowFormModalOpen}
            width={1000}
            onCancel={handleCrossCancel}
            footer={null}
        >
            <br />
            {
                (view === "table") ? (
                    <>
                        <Button onClick={() => setView("form")} color='primary' variant='solid'><PlusOutlined />Add Shows</Button>
                        <hr />
                        <Table dataSource={showsByTheater} columns={showsTableHeading}></Table>
                    </>
                ) : (
                    <>
                        <Form layout='vertical' initialValues={selectedShow || {}} onFinish={onFinish}>
                        <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16} }>
                            <Col span={24}>
                                <Form.Item
                                
                                    name='movie'
                                    label='Movies'
                                    rules={[{required: true, message: "Select the movie!"}]}
                                >
                                    <Select
                                        placeholder='Select a movie'
                                        defaultValue={selectedMovie ? selectedMovie.movieName : ""}
                                        
                                    >
                                        {allMovies && allMovies.map((movie) => (
                                            <Select.Option key={movie._id} value={movie._id}>
                                                {movie.movieName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name='showName'
                                    label='Show Name'
                                    rules={[{required: true, message: "Show Name is required!"}]}
                                >
                                    <Input type='text' placeholder='Enter Show Name (2D, 3D, IMAX etc.)'/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                                    <Col span={12}>
                                        <Form.Item
                                            name='date'
                                            label='Date'
                                            rules={[{required: true, message: "Show date is required!"}]}
                                        >
                                            <Input type='date' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name='time'
                                            label='Show Time'
                                            rules={[{required: true, message: "Show timing is required!"}]}
                                        >
                                            <Input type='text' placeholder='Enter show timings (8:30 AM, 5:30 PM etc)' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16}}>
                                    <Col span={8}>
                                        <Form.Item
                                            name='auditoriumName'
                                            label='Auditorium Name'
                                            rules={[{required: true, message: "Auditorium Name is required!"}]}
                                        >
                                            <Input type='text' placeholder='Enter Auditorium Name' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name='language'
                                            label='Language'
                                            rules={[{required: true, message: "Language is required!"}]}
                                        >
                                            <Input type='text' placeholder='Enter Movie Language' />   
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name='totalSeats'
                                            label='Total Seats'
                                            
                                        >
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Form.Item>
                            <div className='d-flex justify-content-end'>
                            
                                <Button
                                    block
                                    type="primary"
                                    htmlType="submit"
                                    style={{width: "100px", marginRight: "10px"}}
                                    
                                >
                                    Submit
                                </Button>
                                <Button className="m-10" block onClick={handleCancel} style={{width: "100px"}}>
                                    Cancel
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    </>
                )
            }

            {
                isDeleteShowModalOpen && (
                    <DeleteShowModal 
                        isShowDeleteModalOpen={isDeleteShowModalOpen}
                        setIsShowDeleteModalOpen={setIsDeleteShowModalOpen}
                        selectedShow={selectedShow}
                        setSelectedShow={setSelectedShow}
                        getShowsByTheater={getShowsByTheater}
                    />
                )
            }
            
        </Modal>
    </>
  )
}

export default ShowFormModal