const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export function setCookie(res, key, value) {
  res.cookie(key, value, options); // Attach the cookie to the HTTP response
}

export function getCookie(req, key) {
  return req.cookies[key]; // Access cookies from the request object
}

export function removeCookie(res, key) {
  res.clearCookie(key, { path: '/' }); // Clear the cookie
}
