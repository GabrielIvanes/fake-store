import data from "../data.json";
import "../styles/CartSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Cart {
  idProduct: number;
  quantity: number;
}

interface Props {
  cart: Cart[];
  handleCrossClick: (idProduct: number) => void;
  handleMinusClick: (idProduct: number) => void;
  handlePlusClick: (idProduct: number) => void;
  handleTrashClick: () => void;
}

function Cart({
  cart,
  handleCrossClick,
  handleMinusClick,
  handlePlusClick,
  handleTrashClick,
}: Props) {
  return (
    <>
      <div className="cartSheet-box">
        <div className="cartSheet-products">
          {cart.map((cartElement) => (
            <div className="cartSheet-product" key={cartElement.idProduct}>
              <div>
                <img
                  src={data[cartElement.idProduct - 1].image}
                  alt={data[cartElement.idProduct - 1].name}
                />
                <div className="cartSheet-description">
                  <div className="cartSheet-nameAndArtist">
                    <span>{data[cartElement.idProduct - 1].name}</span>
                    <span>{data[cartElement.idProduct - 1].artist}</span>
                  </div>
                  <div className="cartSheet-quantityAndPrice">
                    <div className="cartSheet-handleQuantity">
                      <button
                        onClick={() => handleMinusClick(cartElement.idProduct)}
                      >
                        -
                      </button>
                      <span className="cartSheet-quantityProduct">
                        {cartElement.quantity}
                      </span>
                      <button
                        onClick={() => handlePlusClick(cartElement.idProduct)}
                      >
                        +
                      </button>
                    </div>
                    <span className="cartSheet-priceProduct">
                      {data[cartElement.idProduct - 1].price} €
                    </span>
                  </div>
                </div>
              </div>
              <div className="cartSheet-closeAndPrice">
                <div onClick={() => handleCrossClick(cartElement.idProduct)}>
                  X
                </div>
                <div>
                  {(
                    cartElement.quantity * data[cartElement.idProduct - 1].price
                  ).toFixed(2)}{" "}
                  €
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-information">
          <div className="total-price">
            Total price:{" "}
            {cart
              .reduce(
                (acc, cartElement) =>
                  acc +
                  cartElement.quantity * data[cartElement.idProduct - 1].price,
                0
              )
              .toFixed(2)}{" "}
            €
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            className="trash"
            onClick={handleTrashClick}
          />
        </div>
        <div className="checkout">Checkout</div>
      </div>
    </>
  );
}

export default Cart;
