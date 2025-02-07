import React from 'react'
import { Modal, message } from 'antd'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { SetTheater } from '../../redux/theaterSlice'
import { DeleteTheater } from '../../api/theaterApi'
import { useDispatch, useSelector } from 'react-redux'

const DeleteTheaterModal = ({
  isDeleteTheaterModalOpen,
  setIsDeleteTheaterModalOpen,
  getTheaterData,
  selectedTheater,
  setSelectedTheater
}) =>  {

  const dispatch = useDispatch()
  const { theater } = useSelector(state => state.theaters)
  const [messageApi, contextHolder] = message.useMessage()

  const handleCancel = () => {
    setSelectedTheater(null)
    setIsDeleteTheaterModalOpen(false)
  }

  const handleOk = async() => {
    try {
      dispatch(ShowLoader())

      const theaterId = selectedTheater._id
      const res = await DeleteTheater(theaterId)
      if (res.success){
        messageApi.open({
          type: 'success',
          content: res.message
        })
        getTheaterData()
      }else{
        messageApi.open({
          type: 'error',
          content: res.message
        })
      }

      setSelectedTheater(null)
      setTimeout(() => {
        setIsDeleteTheaterModalOpen(false)
      }, 1005)

      dispatch(HideLoader())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {contextHolder}
      <Modal 
        open={isDeleteTheaterModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}  
      >
        <p>Are you sure you want to delete this record?</p>
      </Modal>
    </>
  )
}

export default DeleteTheaterModal