export function useValidate() {
  const validateUsername = (_: any, value: string): Promise<void> => {
    const EMAIL_DOMAIN = '@budcreate.io'
    const isCorrectPassword = value.endsWith(EMAIL_DOMAIN)
    if (!value) return Promise.reject('请输入账户')
    if (!isCorrectPassword || /[A-Z]/g.test(value)) return Promise.reject('账户错误')
    return Promise.resolve()
  }

  const validatePassword = (_: any, value: string): Promise<void> => {
    if (!value) return Promise.reject('请输入密码')
    if (!/^[!-~]{6,20}$/g.test(value)) {
      return Promise.reject('请输入6-20位数字或字母或者标点结合的密码')
    }
    return Promise.resolve()
  }

  return {
    validateUsername,
    validatePassword,
  }
}
