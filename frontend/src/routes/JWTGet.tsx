import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function JWTGet() {
  const checkToken = () => {
    try {
      const token = new URLSearchParams(location.search).get('code');
      if (!token) {
        throw new Error('No token found in URL');
      }
      Cookies.set('__catalyst__jwt', token);
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <></>;
}
