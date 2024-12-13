import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

const options: CookieSetOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export function setCookie(key: string, value: string) {
  return cookies.set(key, value, options);
}

export function getCookie(key: string) {
  return cookies.get(key);
}

export function removeCookie(key: string) {
  return cookies.remove(key);
}
