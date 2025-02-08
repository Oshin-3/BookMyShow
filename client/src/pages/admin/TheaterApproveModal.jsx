import React from 'react'
import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from 'react-redux'
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import { UpdateTheater } from '../../api/theaterApi';
import moment from 'moment'

const TheaterApproveModal = ({
    selectedTheater,
    setSelectedTheater,
    isTheaterApproveModalOpen,
    setIsTheaterApproverModalOpen,
    getAllTheaters,
    actionType,
    setActionType
}) => {

    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const handleCancel = () => {
        setSelectedTheater(null)
        setIsTheaterApproverModalOpen(false)
    }

    const onFinish = async (value) => {
        try {
            dispatch(ShowLoader())

            let res = null
            if (actionType == "approve"){
                res = await UpdateTheater({...value, id: selectedTheater._id, status: "Approved"})
            }else{
                res = await UpdateTheater({...value, id: selectedTheater._id, status: "Rejected"})
            }
            console.log("res.data ", res)
            if(res.success){
                if (actionType == "approve"){
                    messageApi.open({
                        type: 'info',
                        content: 'Theater is approved by admin'
                    })
                }else{
                    messageApi.open({
                        type: 'info',
                        content: 'Theater is rejected by admin'
                    })
                }
                getAllTheaters()
            }

            setSelectedTheater(null)
            setTimeout(() => {
                setIsTheaterApproverModalOpen(false)
            },1005)
            dispatch(HideLoader())

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    {contextHolder}
        <Modal centered
        open={isTheaterApproveModalOpen}
        width={800}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" initialValues={selectedTheater || {}} onFinish={onFinish}>
          <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={24}>
                  <Form.Item
                  label="Theater Name"
                  name="theaterName"
                  rules={[{ required: true, message: "Theater name is required!" }]}
                  >
                  <Input placeholder="Enter the theater name" disabled='disabled' />
                  </Form.Item>
              </Col>
              <Col span={24}>
                  <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required!" }]}
                  >
                  <TextArea rows="4" placeholder="Enter the Adddress" disabled='disabled'/>
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
                              disabled='disabled'
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
                              disabled='disabled'
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
                          <Input type='email' placeholder='Enter the email address' disabled='disabled'></Input>
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
                          <Input placeholder="Enter the phone no." disabled='disabled'/>
                          </Form.Item>
                      </Col>
                  </Row>
              </Col>
              <Col span={24}>
                <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                    <Col span={24}>
                          <Form.Item
                            label="Comment"
                            name="comment"
                            rules={[{required: true, message: "Comment is required"}]}
                          >
                            <TextArea rows="4" placeholder="Enter the Comment" />
                          </Form.Item>
                    </Col>
                </Row>
              </Col>
          </Row>
          <Form.Item>
          <div className='d-flex justify-content-end'>
          
                {
                    actionType == "approve" ? 
                    (
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            style={{width: "100px", marginRight: "10px"}}
                            
                            >
                            Approve
                        </Button>
                    ) : 
                    (
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            style={{width: "100px", marginRight: "10px"}}
                            danger
                            >
                            Reject
                        </Button>
                    )
                }
                <Button
                    block
                    style={{width: "100px"}}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
              
          </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TheaterApproveModal