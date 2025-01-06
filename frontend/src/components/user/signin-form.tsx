import { Button } from '@/components/ui/button';
import { GrGoogle } from 'react-icons/gr';
import { FaDiscord, FaFacebook } from 'react-icons/fa';
import { ENDPOINTS } from '@/api/endpoints';

const providers = [
  { name: 'Google', icon: <GrGoogle />, endpoint: ENDPOINTS.AUTH.GOOGLE },
  { name: 'Facebook', icon: <FaFacebook />, endpoint: ENDPOINTS.AUTH.FACEBOOK },
  { name: 'Discord', icon: <FaDiscord />, endpoint: ENDPOINTS.AUTH.DISCORD },
];

export function SignInForm() {
  const handleLogin = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_ORIGIN}${provider}`;
  };

  return (
    <div className="my-4 flex flex-col gap-2">
      {providers.map(({ name, icon, endpoint }) => (
        <Button key={name} variant="outline" className="flex items-center gap-2" onClick={() => handleLogin(endpoint)}>
          {icon}
          <span>Sign in using {name}</span>
        </Button>
      ))}
    </div>
  );
}
