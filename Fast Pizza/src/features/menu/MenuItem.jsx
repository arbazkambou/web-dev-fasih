import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  decQuantity,
  deleteItem,
  getQuantityById,
  incQuantity,
} from '../../redux/slices/cartSlice';

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;

  const cart = useSelector((state) => state.cart.cart);

  const cartQuantity = useSelector(getQuantityById(id));

  const isInCart = cartQuantity > 0;

  const dispatch = useDispatch();

  function handleAddItem() {
    const newPizza = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
      ingredients,
      imageUrl,
      soldOut,
    };

    dispatch(addItem(newPizza));
  }

  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  function handleInc(id) {
    dispatch(incQuantity(id));
  }

  function handleDec(id) {
    dispatch(decQuantity(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!isInCart && !soldOut && (
            <Button type="small" onClick={handleAddItem}>
              Add to cart
            </Button>
          )}

          {isInCart && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Button type={'small'} onClick={() => handleDec(id)}>
                  -
                </Button>
                <p>{cartQuantity}</p>
                <Button type={'small'} onClick={() => handleInc(id)}>
                  +
                </Button>
              </div>

              <Button type={'small'} onClick={() => handleDeleteItem(id)}>
                Delete Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
