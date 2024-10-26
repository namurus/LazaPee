import { useMatches } from 'react-router';
import { Link } from 'react-router-dom';

function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol className='mt-5 flex gap-2 font-light'>
      <Link to='/'>
        <li className='opacity-60'>Home</li>
      </Link>
      {crumbs.map((crumb) => (
        <li key={crumb} className='flex items-center justify-between gap-2'>
          <span>&gt;</span>
          <div>{crumb}</div>
        </li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;
