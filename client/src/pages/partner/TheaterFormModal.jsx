import React from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { AddTheater, UpdateTheater } from '../../api/theaterApi';
import moment from 'moment'

const TheaterFormModal = ({
  isTheaterFormModalOpen,
  setIsTheaterFormModalOpen,
  formType,
  setFormType,
  getTheaterData,
  selectedTheater,
  setSelectedTheater,
  user
}) => {

  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const handleCancel = () => {
    setIsTheaterFormModalOpen(false)
    setSelectedTheater(null)
  }

  const onFinish = async(value) => {
    //console.log(value)
    //console.log(user)
    try {
      dispatch(ShowLoader())

      const theaterData = {...value, owner: user._id}
      let res = null
      if (formType == "add"){
        console.log("Add Theater Api")
        res = await AddTheater(theaterData)
      }else{
        console.log("Update theater")
        res = await UpdateTheater({...theaterData, id: selectedTheater._id})
      }
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
        setIsTheaterFormModalOpen(false)
      }, 1005)
      dispatch(HideLoader())
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    
    <>
     {contextHolder}
      <Modal centered
        title={formType == "add" ? "Add Theater" : "Update Theater"}
        open={isTheaterFormModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form layout="vertical" initialValues={selectedTheater || {}} onFinish={onFinish}>
          <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={24}>
                  <Form.Item
                  label="Theater Name"
                  name="theaterName"
                  rules={[{ required: true, message: "Theater name is required!" }]}
                  >
                  <Input placeholder="Enter the theater name" />
                  </Form.Item>
              </Col>
              <Col span={24}>
                  <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required!" }]}
                  >
                  <TextArea rows="4" placeholder="Enter the Adddress" />
                  </Form.Item>
              </Col>
              <Col span={24}>
                  <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                      <Col span={12}>
                          <Form.Item
                          label="City"
                          name="city"
                          rules={[
                              { required: true, message: "Please select the city" },
                          ]}
                          >
                          <Select
                              placeholder="Select City"
                              options={[
                              { value: "Pune", label: "Pune" },
                              { value: "Nagpur", label: "Nagpur" },
                              { value: "Bangalore", label: "Bangalore" },
                              { value: "Mumbai", label: "Mumbai" },
                              { value: "Indore", label: "Indore" },
                              ]}
                          />
                          </Form.Item>
                      </Col>
                      <Col span={12}>
                          <Form.Item
                          label="State"
                          name="state"
                          rules={[
                              { required: true, message: "State is required!" },
                          ]}
                          >
                          <Select
                              placeholder="Select State"
                              options={[
                              { value: "Maharashtra", label: "Maharashtra" },
                              { value: "Madhya Pradesh", label: "Madhya Pradesh" },
                              { value: "Karnataka", label: "Karnataka" },
                              ]}
                          />
                          </Form.Item>
                      </Col>
                  </Row>            
              </Col>
              <Col span={24}>
                  <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                      <Col span={12}>
                          <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                              { required: true, message: "Email is required!" },
                          ]}
                          >
                          <Input type='email' placeholder='Enter the email address'></Input>
                          </Form.Item>
                      </Col>
                      <Col span={12}>
                          <Form.Item
                          label="Phone No."
                          name="phoneNo"
                          rules={[
                              { required: true, message: "Phone No. is required!" },
                          ]}
                          >
                          <Input placeholder="Enter the phone no." />
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

export default TheaterFormModal