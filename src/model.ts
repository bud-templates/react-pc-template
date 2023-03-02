// import { useEffect, useState } from 'react'
import createModel from './libs/createModel'

const useGlobal = () => {
  //   const [userInfo, $userInfo] = useState()
  //   const fetchUserInfo = async () => {
  //     try {
  //         const res = await getUserInfo()
  //         $userInfo(res)
  //     } catch (error: any) {
  //       //
  //     }
  //   }
  //   useEffect(() => {
  //     fetchUserInfo()
  //   }, [])
  //   return {
  //     userInfo,
  //   }
}

const GlobalModel = createModel(useGlobal)

export default GlobalModel
