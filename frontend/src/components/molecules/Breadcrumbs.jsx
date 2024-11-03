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
  crumbs = crumbs.flat();
  return (
    <ol className='mt-5 flex flex-wrap gap-2 text-sm font-light capitalize transition'>
      <Link to='/' className='hover:underline'>
        <li className='opacity-60'>Home</li>
      </Link>
      {crumbs.map((crumb) => (
        <li
          key={crumb.name}
          className='flex items-center justify-between gap-2'
        >
          <span>&gt;</span>
          {crumb.path ? (
            <Link to={crumb.path} className='hover:underline'>
              <span className='opacity-60'>{crumb.name}</span>
            </Link>
          ) : (
            <span>{crumb.name}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;
