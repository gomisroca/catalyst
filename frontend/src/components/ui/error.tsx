function Error({ message }: { message?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="mb-4 text-red-500">{message || 'An unknown error occurred.'}</p>
    </div>
  );
}

export default Error;
