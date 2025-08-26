import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../services/apiRestaurant';
import Loader from '../../ui/Loader';
import MenuItem from './MenuItem';

export default function Menu() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  if (isLoading) return <Loader />;

  if (isError) return <p>{error.message}</p>;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {data.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
