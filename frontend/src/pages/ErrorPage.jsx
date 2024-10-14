<<<<<<< Updated upstream
import Template from './Template';

export default function ErrorPage() {
=======
import Template from "./Template";

function ErrorPage() {
>>>>>>> Stashed changes
  return (
    <Template>
      <ErrorContent />
    </Template>
  );
}

function ErrorContent() {
  return (
<<<<<<< Updated upstream
    <div className='flex flex-1 flex-col items-center justify-center'>
      <h1 className='font-display text-6xl font-bold'>404</h1>
      <p className='font-primary text-xl'>Page not found</p>
=======
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="font-display text-6xl font-bold">404</h1>
      <p className="font-primary text-xl">Page not found</p>
>>>>>>> Stashed changes
    </div>
  );
}

<<<<<<< Updated upstream
export { ErrorContent };
=======
export default ErrorPage;
>>>>>>> Stashed changes
