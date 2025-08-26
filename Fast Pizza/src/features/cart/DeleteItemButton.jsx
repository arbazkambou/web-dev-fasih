import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from '../../redux/slices/cartSlice';

function DeleteItemButton({ id }) {
  const dispatch = useDispatch();

  return (
    <Button type={'small'} onClick={() => dispatch(deleteItem(id))}>
      Delete Item
    </Button>
  );
}

export default DeleteItemButton;
