import { Select } from 'antd'
import * as React from 'react'
import style from './index.module.scss'

interface IEnvSelectProps {}

export const EnvOptions = [
  {
    value: 'prod',
    label: '正式',
  },
  {
    value: 'alpha',
    label: 'alpha',
  },
  {
    value: 'master',
    label: '测试',
  },
]

const EnvSelect: React.FunctionComponent<IEnvSelectProps> = () => {
  const handleChange = (value: string) => {
    // todo:
    location.href = `https://cdn.joinbudapp.com/webtool-cn/${value}/index.html#/`
  }
  return (
    <Select
      defaultValue={process.env.REACT_APP_ENV}
      style={{ width: 88 }}
      onChange={handleChange}
      options={EnvOptions}
      className={style.envSelect}
    />
  )
}

export default EnvSelect
