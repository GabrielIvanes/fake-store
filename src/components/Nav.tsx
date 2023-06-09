import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/Nav.css";
interface Cart {
  idProduct: number;
  quantity: number;
}

interface Props {
  cart: Cart[];
  handleProductsClick: () => void;
  handleCartClick: () => void;
}

function Nav({ cart, handleProductsClick, handleCartClick }: Props) {
  return (
    <div className="nav">
      <h1>Fake shop</h1>
      <div className="h2-container">
        <h2 onClick={handleProductsClick}>Products</h2>
      </div>
      <div className="cart-container">
        <div className="cart-box" onClick={handleCartClick}>
          <span>Your cart</span>
          <FontAwesomeIcon className="cart" icon={faCartShopping} />
          <span className="cart-number">{cart.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
