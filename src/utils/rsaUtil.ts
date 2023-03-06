import { JSEncrypt } from 'jsencrypt'

class RsaUtil {
  private bitsSize = '2048'
  private rsa: JSEncrypt
  private publicKey =
    '-----BEGIN PUBLIC KEY-----\n' + 'thisissdfasdfasdfasd\n' + 'KQIDAQAB\n' + '-----END PUBLIC KEY-----'

  private privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpAIBAAKCAQEAu5a7MMkL1yg3oj3PDjRfRKwYuH+thisis.......\n' +
    'CHyuMNQ/msUqE4ksQva8S+.........==\n' +
    '-----END RSA PRIVATE KEY-----'

  constructor() {
    this.rsa = new JSEncrypt({ default_key_size: this.bitsSize })
  }

  decrypt(item: any, privateKey: string) {
    privateKey && this.rsa.setPrivateKey(privateKey)
    const decodeStr = this.rsa.decrypt(item)
    if (decodeStr === false) {
      return null
    }
    // try {
    //   decodeStr = JSON.parse(decodeStr)
    // } catch (e) {
    //   console.error(e)
    // }
    return decodeStr
  }

  encrypt(item: any, publicKey: string) {
    if (item instanceof Object) {
      item = JSON.stringify(item)
    }
    publicKey && this.rsa.setPublicKey(publicKey)
    return this.rsa.encrypt(item)
  }

  getPublicKey() {
    return this.publicKey
  }

  getPrivateKey() {
    return this.privateKey
  }
}

const rsa = new RsaUtil()

export default rsa
