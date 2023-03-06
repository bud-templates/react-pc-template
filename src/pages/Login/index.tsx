import React from 'react'
import { RouteProps } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import style from './index.module.scss'
import { useValidate } from './hook'
// import { accountLogin, UserLoginResp } from 'services/account'
// import { getEncryptPassword } from 'utils/encrypt'

type RoutesProps = RouteProps & {
  key?: string
}

// interface UserInfo {
//   username: string
//   password: string
// }

// todo: 根据项目业务修改
const Login: React.FunctionComponent<RoutesProps> = () => {
  // const navigator = useNavigate()
  const { validateUsername, validatePassword } = useValidate()
  // const { trigger, isMutating } = useSWRMutation('/op/auth/login', async (url, { arg }) => await accountLogin(arg))

  // const handleLoginSuccess = (result: any, uid: string) => {
  // const { token, realName, opRole } = result || {}
  // storageLoginInfo({ token, uid, realName, opRole })
  // message.success('登录成功')
  // navigator('/')
  // }

  const onFinish = async () => {
    // values.password = getEncryptPassword(values.password)
    // const res = await trigger(values)
    // res?.token && handleLoginSuccess(res, values.username)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.loginContainer}>
      <img
        className={style.loginBg}
        src='https://buddy-app-bucket.s3-accelerate.amazonaws.com/bud-webtool-us-test/assets/dashboard@2x.46643101.png'
      />
      <div className={style.loginBody}>
        <p className={style.formTitle}>Project Title</p>
        <Form
          name='basic'
          layout='vertical'
          autoComplete='off'
          onFinish={onFinish}
          className={style.loginForm}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}>
          <Form.Item label='账户' name='username' rules={[{ required: true, validator: validateUsername }]}>
            <Input size='large' />
          </Form.Item>

          <Form.Item label='密码' name='password' rules={[{ required: true, validator: validatePassword }]}>
            <Input.Password size='large' />
          </Form.Item>

          <Form.Item className={style.btnContainer}>
            {/* <Button disabled={isMutating} loading={isMutating} className={style.btn} type='primary' htmlType='submit'> */}
            <Button className={style.btn} type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
