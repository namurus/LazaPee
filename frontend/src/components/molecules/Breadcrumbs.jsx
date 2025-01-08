import { useMatches } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

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
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((crumb) => (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={crumb.name}>
              {crumb.path ? (
                <Link to={crumb.path}>{crumb.name}</Link>
              ) : (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
