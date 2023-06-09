import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "../styles/Product.css";
import HeartIcon from "./HeartIcon";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: number;
  name: string;
  artist: string;
  liked: boolean;
}

interface Props {
  product: Product;
  handleHeartClick: () => void;
  handleQuickAddClick: (idProduct: number, quantity: number) => void;
  handleProductClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void;
}

function Product({
  product,
  handleHeartClick,
  handleQuickAddClick,
  handleProductClick,
}: Props) {
  return (
    <div
      key={product.id}
      className="product"
      onClick={(event) => handleProductClick(event, product.id)}
    >
      {!product.liked ? (
        <div className="heart-box">
          <FontAwesomeIcon
            className="heart"
            icon={faHeart}
            style={{ color: "#ff0000" }}
            onClick={handleHeartClick}
          />
        </div>
      ) : (
        <div className="heart-box">
          <HeartIcon handleClick={handleHeartClick} />
        </div>
      )}
      <img src={product.image} alt={product.name} />
      <div className="nameAndPrice">
        <p className="name">{product.name}</p>
        <p className="price">{product.price}</p>
      </div>
      <div className="artist">{product.artist}</div>
      <div className="quickAdd">
        <p>Quick add</p>
        <button onClick={() => handleQuickAddClick(product.id, 1)}>+</button>
      </div>
    </div>
  );
}

export default Product;
