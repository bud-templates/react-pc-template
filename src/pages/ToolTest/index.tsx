import * as React from 'react'
import { DatePicker } from 'antd'
import style from './index.module.scss'

interface ITestToolProps {}

const TestTool: React.FunctionComponent<ITestToolProps> = () => {
  return (
    <div className={style.tooltest}>
      <div>tool test</div>
      <DatePicker />
    </div>
  )
}

export default TestTool
