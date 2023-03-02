import React from 'react'
import styles from './index.module.scss'

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.title}>404 页面不存在</div>
    </div>
  )
}

export default NotFound
