import React, { use, useState } from 'react'
import { useEffect } from 'react'
import { Table, Button} from 'antd'
import { GetAllTheatersByOwner } from '../../api/theaterApi'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { SetTheater } from '../../redux/theaterSlice'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import TheaterFormModal from './TheaterFormModal'
import DeleteTheaterModal from './DeleteTheaterModal'

function TheaterList() {

    const dispatch = useDispatch()
    const { theater } = useSelector(state => state.theaters)
    const { user } = useSelector(state => state.users)
    const [formType, setFormType] = useState("add")
    const [selectedTheater, setSelectedTheater] = useState(null)
    const [isTheaterFormModalOpen, setIsTheaterFormModalOpen] = useState(false)
    const [isDeleteTheaterModalOpen, setIsDeleteTheaterModalOpen] = useState(false)

    const getTheaterData = async () => {
        try {
            dispatch(ShowLoader())

            const ownerId = user._id
            console.log("user-> ", user)
            const res = await GetAllTheatersByOwner(ownerId)
            const allTheaters = res.data
            dispatch(SetTheater(allTheaters.map(function (item){
                return {...item, key: `theater${item.id}`}
            })))
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }
    
    const tableHeadings = [
        {
            title: "Name",
            dataIndex: "theaterName"
        },
        {
            title: "Address",
            dataIndex: "address"
        },
        {
            title: "City",
            dataIndex: "city"
        },
        {
            title: "State",
            dataIndex: "state"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone no.",
            dataIndex: "phoneNo"
        },
        {
            title: "Comment",
            dataIndex: "comment"
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Action",
            render: (text, data) => {
                return(
                    <>
                        <Button color='primary' variant='outlined' className='margin-10' onClick={() => {
                            setIsTheaterFormModalOpen(true)
                            setFormType("edit")
                            setSelectedTheater(data)
                        }}>
                            <EditOutlined/>
                        </Button>
                        <Button color='danger' variant='solid' onClick={() => {
                            setIsDeleteTheaterModalOpen(true)
                            setSelectedTheater(data)
                        }}>
                            <DeleteOutlined/>
                        </Button>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        getTheaterData()
    }, [])

  return (
    <div>
        <div className='d-flex justify-content-end'>
            <Button className='margin-10' type='primary' onClick={() => {
                setIsTheaterFormModalOpen(true)
                setFormType("add")
            }}>Add Theater <PlusOutlined/></Button>
        </div>
        <Table dataSource={theater} columns={tableHeadings}>

        </Table>
        {
            isTheaterFormModalOpen && (
                <TheaterFormModal
                    isTheaterFormModalOpen = {isTheaterFormModalOpen}
                    setIsTheaterFormModalOpen = {setIsTheaterFormModalOpen}
                    formType = {formType}
                    setFormType = {setFormType}
                    getTheaterData = {getTheaterData}
                    selectedTheater = {selectedTheater}
                    setSelectedTheater = {setSelectedTheater}
                    user = {user}
                />
            )
        }

        {
            isDeleteTheaterModalOpen && (
                <DeleteTheaterModal
                    isDeleteTheaterModalOpen = {isDeleteTheaterModalOpen}
                    setIsDeleteTheaterModalOpen = {setIsDeleteTheaterModalOpen}
                    getTheaterData = {getTheaterData}
                    selectedTheater = {selectedTheater}
                    setSelectedTheater = {setSelectedTheater}
                />
            )
        }
    </div>
  )
}

export default TheaterList