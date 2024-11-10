import { redirect } from 'react-router-dom';

async function rootLoader() {
  return null;
}

async function rootAction({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const searchParams = formData.get('search');

  return redirect(`/search?search=${searchParams}`);
}

export { rootLoader, rootAction };
