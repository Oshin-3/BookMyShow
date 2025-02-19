import React from 'react'
import { Modal, message } from 'antd'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteShow } from '../../api/showApi'

const DeleteShowModal = (
    {isShowDeleteModalOpen,
    setIsShowDeleteModalOpen,
    selectedShow,
    setSelectedShow,
    getShowsByTheater}
) => {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const handleCancel = () => {
        setIsShowDeleteModalOpen(false)
        setSelectedShow(null)
    }

    const handleOk = async() => {
        try {
            dispatch(ShowLoader())
            const showId = selectedShow._id
            console.log("showId ", selectedShow._id)
            const res = await DeleteShow(showId)
            if (res.success){
                messageApi.open({
                    type: 'success',
                    content: res.message
                })
                getShowsByTheater()
            }else{
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }

            setSelectedShow(null)
            setTimeout(() => {
                setIsShowDeleteModalOpen(false)
            }, 1005)
            dispatch(HideLoader())
        } catch (error) {
            setIsShowDeleteModalOpen(false)
            setSelectedShow(false)
            console.log(error)
        }
    }
  return (
    <>
        {contextHolder}
        <Modal 
            open={isShowDeleteModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}  
        >
            <p>Are you sure you want to delete this record?</p>
        </Modal>
    </>
  )
}

export default DeleteShowModal