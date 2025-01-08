import { CookieOptions, Request, Response } from 'express';

export function setCookie(res: Response, key: string, value: string, maxAge: number = 7 * 24 * 60 * 60 * 1000) {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAge,
    path: '/',
  };
  res.cookie(key, value, options); // Attach the cookie to the HTTP response
}

export function getCookie(req: Request, key: string) {
  return req.cookies[key]; // Access cookies from the request object
}

export function removeCookie(res: Response, key: string) {
  res.clearCookie(key, { path: '/' }); // Clear the cookie
}
