import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPreview() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="flex items-center text-yellow-700 hover:text-yellow-800 font-semibold">
      <span className="mr-2">Cart</span>
      <span className="bg-yellow-600 text-white rounded-full px-2 py-1 text-sm">
        {totalItems}
      </span>
    </Link>
  );
}