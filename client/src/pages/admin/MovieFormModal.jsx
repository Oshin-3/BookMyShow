import React from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { AddMovie, UpdateMovie } from '../../api/movieApi'
import moment from 'moment'

const MovieFormModal = ({
    isMovieFormModalOpen,
    setIsMovieFormModalOpen,
    formType,
    setFormType,
    getAllMovies,
    selectedMovie,
    setSelectedMovie
}) => {

    const dispatch = useDispatch()
    const [messageApi, contextHeader] = message.useMessage();

    //console.log("selected movie modal ", selectedMovie)
    // if (selectedMovie){
    //     selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("DD-MM-YYYY");
    // }

    const onFinish = async(value) => {
        try {

            dispatch(ShowLoader())

            let res = null
            if (formType == "add"){
                console.log("Add Movie")
                res = await AddMovie(value)
            }else{
                console.log("Update Movie")
                console.log(value)
                res = await UpdateMovie({...value, id: selectedMovie._id})
            }
            console.log("Data=> ", res.data)
            if (res.success){
                getAllMovies()
                // messageApi.open({
                //     type: 'success',
                //     content: res.message
                // })
                messageApi.success(res.message)
                setIsMovieFormModalOpen(false)
            }else{
                // messageApi.open({
                //     type: 'error',
                //     content: res.message
                // })
                messageApi.error(res.message)
            }

            setSelectedMovie(null)
            //setFormType('add')
            dispatch(HideLoader())
            
        } catch (error) {
            
        }
    }


    const handleCancel = () => {
        setIsMovieFormModalOpen(false)
        setSelectedMovie(null)
    }


  return (
    <>
        {contextHeader}
        <Modal centered
            title={formType === "add" ? "Add Movie" : "Edit Movie"}
            open={isMovieFormModalOpen}
            width={800}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" initialValues={selectedMovie || {}} onFinish={onFinish}>
                <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                    <Col span={24}>
                        <Form.Item
                        label="Movie Name"
                        name="movieName"
                        rules={[{ required: true, message: "Movie name is required!" }]}
                        >
                        <Input placeholder="Enter the movie name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Description is required!" }]}
                        >
                        <TextArea rows="4" placeholder="Enter the description" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                            <Col span={8}>
                                <Form.Item
                                label="Movie Duration (in min)"
                                name="duration"
                                rules={[
                                    { required: true, message: "Movie duration is required!" },
                                ]}
                                >
                                <Input type="number" placeholder="Enter the movie duration" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                label="Select Movie Language"
                                name="language"
                                rules={[
                                    { required: true, message: "Movie language is required!" },
                                ]}
                                >
                                <Select
                                    placeholder="Select Language"
                                    options={[
                                    { value: "English", label: "English" },
                                    { value: "Hindi", label: "Hindi" },
                                    { value: "Punjabi", label: "Punjabi" },
                                    { value: "Telugu", label: "Telugu" },
                                    { value: "Bengali", label: "Bengali" },
                                    { value: "German", label: "German" },
                                    ]}
                                />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                label="Release Date"
                                name="releaseDate"
                                rules={[
                                    {
                                    required: true,
                                    message: "Movie Release Date is required!",
                                    },
                                ]}
                                >
                                <Input type="date" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                            <Col span={24}>
                                <Form.Item
                                label="Select Movie Genre"
                                name="genre"
                                rules={[
                                    { required: true, message: "Movie genre is required!" },
                                ]}
                                >
                                <Select
                                    mode='multiple'
                                    placeholder="Select Movie"
                                    options={[
                                    { value: "Action", label: "Action" },
                                    { value: "Comedy", label: "Comedy" },
                                    { value: "Horror", label: "Horror" },
                                    { value: "Romance", label: "Romance" },
                                    { value: "Fantasy", label: "Fantasy"},
                                    { value: "True Crime", label: "True Crime" },
                                    { value: "Thriller", label: "Thriller" },
                                    { value: "Mystery", label: "Mystery" },
                                    { value: "Biopic", label: "Biopic"},
                                    { value: "Animation", label: "Animation"}
                                    ]}
                                />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                label="Poster URL"
                                name="poster"
                                rules={[
                                    { required: true, message: "Movie Poster is required!" },
                                ]}
                                >
                                <Input placeholder="Enter the poster URL" />
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

export default MovieFormModal