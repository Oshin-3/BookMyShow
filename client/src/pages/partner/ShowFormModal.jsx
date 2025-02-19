import React, { useEffect , useState} from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { SetMovie } from '../../redux/movieSlice';
import { AddShows, UpdateShow } from '../../api/showApi';
import { GetAllMovies } from '../../api/movieApi'

const ShowFormModal = ({
    isShowFormModalOpen,
    setIsShowFormModalOpen,
    selectedTheater,
    setSelectedTheater,
    formType,
    setFormType,
    selectedShow,
    setSelectedShow,
    getShowsByTheater
}) => {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const [allMovies, setAllMovies] = useState(null)
    const [shows, setShows] = useState(null)


    const handleCancel = () => {
        setSelectedTheater(null)
        setIsShowFormModalOpen(false)
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
            console.log(values)
            dispatch(ShowLoader())

            let res = null

            if (formType == "add")
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
                
            }
            else{
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }

            setSelectedTheater(null)
            setTimeout(() => {
                setIsShowFormModalOpen(false)
            }, 1005)
            getShowsByTheater()
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMovies()
    },[dispatch])

    console.log('show ' , selectedShow.movie.movieName)
  return (
    <>
    {contextHolder}
        <Modal centered
            title={formType == "add" ? "Add Show" : "Edit Show"}
            open={isShowFormModalOpen}
            width={800}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout='vertical' initialValues={selectedShow || {}} onFinish={onFinish}>
                <Row gutter={{xs: 6, sm: 10, md: 12, lg: 16} }>
                    <Col span={24}>
                        <Form.Item
                        
                            name='movie'
                            label='Movies'
                            rules={[{required: true, message: "Select the movie!"}]}
                        >
                            <Select 
                                placeholder='Select Movie' defaultValue={selectedShow.movie.movieName || {}}
                            >
                                {allMovies && allMovies.length > 0 ? (
                                        allMovies.map((movie) => (
                                            <Select.Option key={movie._id} value={movie._id}>
                                                {movie.movieName}
                                            </Select.Option>
                                        ))
                                    ) : (
                                        <Select.Option disabled>No movies available</Select.Option>
                                    )}
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
        </Modal>
    </>
  )
}

export default ShowFormModal