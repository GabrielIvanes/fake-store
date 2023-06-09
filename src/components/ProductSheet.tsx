import data from "../data.json";
import "../styles/ProductSheet.css";
import { useState } from "react";

interface Props {
  idProduct: number;
  handleAddToCartClick: (idProduct: number, quantity: number) => void;
}

function ProductSheet({ idProduct, handleAddToCartClick }: Props) {
  const [inputValue, setInputValue] = useState(0);

  function handleInputChange(value: string) {
    setInputValue(parseInt(value, 10));
  }

  return (
    <div className="productSheet">
      <div className="product-description">
        <h1>{data[idProduct - 1].name}</h1>
        <h2>{data[idProduct - 1].artist}</h2>
        <h3>rate: {data[idProduct - 1].rating}/5</h3>
        <p>{data[idProduct - 1].description}</p>
      </div>
      <div>
        <img src={data[idProduct - 1].image} alt={data[idProduct - 1].name} />
        <div className="addToCart">
          <div className="quantity">
            <span>Quantity: </span>
            <input
              type="number"
              max={99}
              value={inputValue}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </div>
          <button onClick={() => handleAddToCartClick(idProduct, inputValue)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSheet;
