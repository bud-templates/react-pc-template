import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  const navigator = useNavigate()
  const handleBackHome = () => {
    navigator('/')
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
