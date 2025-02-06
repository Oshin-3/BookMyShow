import React from 'react'
import { Modal, message } from 'antd'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { SetMovie } from '../../redux/movieSlice'
import { DeleteMovie } from '../../api/movieApi'
import { useDispatch } from 'react-redux'

const DeleteMovieModal = ({
    isDeleteMovieModalOpen,
    setIsDeleteMovieModalOpen,
    getAllMovies,
    selectedMovie,
    setSelectedMovie
}) => {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const handleOk = async () => {
        console.log("seletected value-> ", selectedMovie)
        try {
            dispatch(ShowLoader())

            const res = await DeleteMovie(selectedMovie)
            console.log("res-> ", res.data)
            if (res.success){
                messageApi.open({
                    type: 'success',
                    content: res.message
                })
                getAllMovies()
            }else{
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }

            setSelectedMovie(null)
            setTimeout(() => {
                setIsDeleteMovieModalOpen(false)
            }, 1005)

            dispatch(HideLoader())
        } catch (error) {
            
        }
    }


    const handleCancel = () => {
        setSelectedMovie(null)
        setIsDeleteMovieModalOpen(false)
    }

  return (
    <div>
        <Modal
            open={isDeleteMovieModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
  
        >
            <p>Are you sure you want to delete this record?</p>

        </Modal>
    </div>
  )
}

export default DeleteMovieModal