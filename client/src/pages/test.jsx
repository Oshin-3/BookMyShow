import React from 'react';
import { Button, notification, message } from 'antd';


const Test = () => {
  const [api, contextHolder] = notification.useNotification()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const handleClick = () => {
    api.info({
        message: "Hello World!"
    })
  };

  const handleMessage = () => {
    messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
  }

  return (
    <>
      {contextHolder}
      <Button onClick={handleClick}>Show Success Message</Button>
     
      <Button onClick={handleMessage}>Show Message</Button>
    </>
  );
};

export default Test;
