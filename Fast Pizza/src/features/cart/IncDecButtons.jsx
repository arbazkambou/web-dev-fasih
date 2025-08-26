import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decQuantity, incQuantity } from '../../redux/slices/cartSlice';

function IncDecButtons({ id, quantity }) {
  const dispatch = useDispatch();

  function handleInc(id) {
    dispatch(incQuantity(id));
  }

  function handleDec(id) {
    dispatch(decQuantity(id));
  }
  return (
    <div className="flex items-center gap-2">
      <Button type={'small'} onClick={() => handleDec(id)}>
        -
      </Button>
      <p>{quantity}</p>
      <Button type={'small'} onClick={() => handleInc(id)}>
        +
      </Button>
    </div>
  );
}

export default IncDecButtons;
