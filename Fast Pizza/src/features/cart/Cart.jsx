import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartState } from '../../redux/slices/cartSlice';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { getUsername } from '../../redux/slices/userSlice';

function Cart() {
  const cart = useSelector(getCartState);
  const username = useSelector(getUsername);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="text-blue-600">
        &larr; Back to menu
      </Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
