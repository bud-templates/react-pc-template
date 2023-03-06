import rsa from './rsaUtil'

export const backendKey = '-----BEGIN RSA Public key-----\n this is .......... \n-----END RSA Public key-----'

export const getEncryptPassword = (password: string): string => {
  const passwordByEncrypt = String(rsa.encrypt(password, String(backendKey)))
  if (!passwordByEncrypt) {
    return ''
  }
  return passwordByEncrypt
}
