import Cookies from 'universal-cookie';

const cookies = new Cookies();

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export function setCookie(key, value) {
  return cookies.set(key, value, options);
}

export function getCookie(key) {
  return cookies.get(key);
}

export function removeCookie(key) {
  return cookies.remove(key);
}
