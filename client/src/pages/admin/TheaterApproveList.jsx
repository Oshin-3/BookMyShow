import React, { useState, useEffect } from 'react'
import { Table, Button} from 'antd'
import { GetAllTheaters } from '../../api/theaterApi'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice'
import { SetTheater } from '../../redux/theaterSlice'
import moment from 'moment'
import TheaterApproveModal from './TheaterApproveModal'
//import TheaterFormModal from './TheaterFormModal'
//import DeleteTheaterModal from './DeleteTheaterModal'

function TheaterApproveList() {

  const dispatch = useDispatch()
  const { theater } = useSelector(state => state.theaters)
  const [isTheaterApproveModalOpen, setIsTheaterApproverModalOpen] = useState(false)
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [actionType, setActionType] = useState("approve")

  const getAllTheaters = async () => {
    try {
      dispatch(ShowLoader())
      
      const res = await GetAllTheaters()
      //console.log(res)
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
        title: "Theater Owner",
        dataIndex: "owner.firstName",
        render: (text, data) => {
          //console.log("owner data -> ", data.owner)
          return `${data.owner.firstName} ${data.owner.lastName}`
        }
    },
    {
        title: "Comment",
        dataIndex: "comment"
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text, data) => {
          if (data.status === "Approved"){
              return <span style={{ color: "#0000FFbl" }}>{text}</span>;
          }else if (data.status === "Rejected"){
              return <span style={{ color: "#e55353" }}>{text}</span>
          }else{
              return <span style={{ color: "#008000" }}>{text}</span>;
          }
      }
    },
    {
        title: "Action",
        width: "20%",
        render: (text, data) => {
            return(
                <>
                    <Button type='primary' varient='outlined' className='margin-10' 
                      disabled={data.status === "Approved" || data.status === "Rejected"} onClick={() => {
                      setSelectedTheater(data)
                      setIsTheaterApproverModalOpen(true)
                      setActionType("approve")                      
                    }}>
                      Approve
                    </Button>
                    <Button type='primary' variant='solid' danger
                      disabled={data.status === "Approved" || data.status === "Rejected"} onClick={() => {
                      setSelectedTheater(data)
                      setIsTheaterApproverModalOpen(true)
                      setActionType("reject")
                    }}>
                      Reject
                    </Button>
                </>
            )
        }
    }]

    useEffect(() => {
      getAllTheaters()
    }, [])

  return (
    <div>
        <Table dataSource={theater} columns={tableHeadings}>

        </Table>
        {
          isTheaterApproveModalOpen && (
            <TheaterApproveModal
              selectedTheater = {selectedTheater}
              setSelectedTheater = {setSelectedTheater}
              isTheaterApproveModalOpen = {isTheaterApproveModalOpen}
              setIsTheaterApproverModalOpen = {setIsTheaterApproverModalOpen}
              getAllTheaters = {getAllTheaters}
              actionType = {actionType}
              setActionType = {setActionType}
            />
          )
        }
    </div>
  )
}

export default TheaterApproveList