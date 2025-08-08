import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { Link } from 'react-router-dom';

function Home() {
  const user = useSelector((store) => store.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!user && <CreateUser />}

      {user && (
        <Link to={'/menu'}>
          <Button type={'primary'}>Continue Ordering</Button>
        </Link>
      )}
    </div>
  );
}

export default Home;
