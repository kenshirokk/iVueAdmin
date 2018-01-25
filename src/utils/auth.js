import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getAuth() {
  return Cookies.get('auth')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}