import get from 'lodash-es/get'
// import { UserLoginResp, AuthRole, OP_ROLE } from 'services/account'
import CustomStorage from 'utils/customStorage'

const TokenKey = 'token'
const UidKey = 'uid'
const RolesKey = 'roles'
const RealName = 'realName'
const VueVersionKey = 'vueVersion'

// 管理员角色枚举
// export enum OP_ROLE {
//   SUPER_ADMIN_CODE = 101,
//   MANAGER_CODE = 201,
//   MEMBER_CODE = 301,
// }

export enum ROLE_CODE_ID {
  SUPER_ADMIN_CODE = 1,
  MANAGER_CODE = 2,
  MEMBER_CODE = 3,
}

export const isJsonString = (str: string) => {
  try {
    if (typeof JSON.parse(str) == 'object') {
      return true
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return false
}

export const getVueVersion = () => {
  return CustomStorage.getItem(VueVersionKey)
}

export const setRoles = (result: number | undefined) => {
  CustomStorage.setItem(RolesKey, JSON.stringify(result))
}

export const getRoles = () => {
  const role = Number(CustomStorage.getItem(RolesKey))
  return role
}

export const setToken = (result: string) => {
  CustomStorage.setItem(TokenKey, result)
}

export const getToken = () => {
  return CustomStorage.getItem(TokenKey)
}

export const getUid = (): string => {
  return String(CustomStorage.getItem(UidKey))
}

export const setUid = (uid: string) => {
  CustomStorage.setItem(UidKey, uid)
}

export const setRealName = (result: string | undefined) => {
  CustomStorage.setItem(RealName, result)
}

// 获取真实姓名，不存在真实姓名则显示角色名称
export const getRealName = () => {
  try {
    const roleName = CustomStorage.getItem(RolesKey)
    return CustomStorage.getItem(RealName) || get(roleName ? JSON.parse(roleName) : {}, '[0].name', '')
  } catch (error) {
    console.log(error)
  }
}

// 登录缓存个人信息缓存 todo: any
export const storageLoginInfo = ({ token, uid, realName, opRole }: any) => {
  setRoles(opRole)
  setToken(token)
  setUid(String(uid))
  setRealName(realName)
}

// 退出登录清空个人信息缓存
export const removeStoreByLogout = () => {
  CustomStorage.removeItem('commonStore')
  CustomStorage.removeItem(UidKey)
  CustomStorage.removeItem(TokenKey)
  CustomStorage.removeItem(RolesKey)
  CustomStorage.removeItem(RealName)
  CustomStorage.removeItem(RolesKey)
}

// // 是否为管理员
// export const isAdmin = () => {
//   const roleCode = getRoles()
//   const isAdmin = [OP_ROLE.Admin, OP_ROLE.SuperAdmin].includes(roleCode)
//   return isAdmin
// }

// // 是否为超级管理员
// export const isSuperAdmin = (): boolean => {
//   const roleCode = getRoles()
//   const isAdmin = [OP_ROLE.SuperAdmin].includes(roleCode)
//   return isAdmin
// }

// // 是否为普通管理员
// export const isManager = () => {
//   const roleCode = getRoles()
//   const isAdmin = [OP_ROLE.Admin].includes(roleCode)
//   return isAdmin
// }

// // 是否为成员
// export const isMember = () => {
//   const roleCode = getRoles()
//   const isAdmin = [OP_ROLE.Member].includes(roleCode)
//   return isAdmin
// }
