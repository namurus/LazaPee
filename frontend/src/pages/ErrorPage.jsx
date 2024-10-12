import Template from './Teamplate';

export default function ErrorPage() {
  return (
    <Template>
      <ErrorContent />
    </Template>
  );
}

function ErrorContent() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <h1 className='font-display text-6xl font-bold'>404</h1>
      <p className='font-primary text-xl'>Page not found</p>
    </div>
  );
}

export { ErrorContent };
