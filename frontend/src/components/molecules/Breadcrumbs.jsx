import { Breadcrumb } from 'flowbite-react';
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
    <Breadcrumb className='mt-5 text-sm capitalize'>
      <Breadcrumb.Item>
        <Link to='/'>Home</Link>
      </Breadcrumb.Item>
      {crumbs.map((crumb) => (
        <Breadcrumb.Item key={crumb.name}>
          {crumb.path ? <Link to={crumb.path}>{crumb.name}</Link> : crumb.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
