import { useState, useEffect } from "react";
import data from "../data.json";
import Product from "./Product";
import "../styles/ListProducts.css";

interface ProductType {
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

interface Filter {
  artist: string;
  isChecked: boolean;
}

interface Props {
  handleQuickAddClick: (idProduct: number, quantity: number) => void;
  handleProductClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void;
  filters: Filter[];
  isFilterActive: boolean;
}

function ListProducts({
  handleQuickAddClick,
  handleProductClick,
  filters,
  isFilterActive,
}: Props) {
  const [products, setProducts] = useState<ProductType[]>(data);
  const [productsFiltered, setProductsFiltered] = useState<ProductType[]>(data);

  function handleClick(product: ProductType) {
    const tmpProducts = [...products];
    tmpProducts[product.id - 1].liked = !product.liked;
    setProducts(tmpProducts);
  }

  useEffect(() => {
    setProductsFiltered(
      products.filter((product) => {
        return filters.some(
          (filter) => filter.isChecked && filter.artist === product.artist
        );
      })
    );
  }, [products, filters]);

  return (
    <div className="products-wrapper">
      <div className="products">
        {isFilterActive
          ? productsFiltered.map((product) => (
              <Product
                handleProductClick={handleProductClick}
                key={product.id}
                product={product}
                handleHeartClick={() => handleClick(product)}
                handleQuickAddClick={handleQuickAddClick}
              />
            ))
          : products.map((product) => (
              <Product
                handleProductClick={handleProductClick}
                key={product.id}
                product={product}
                handleHeartClick={() => handleClick(product)}
                handleQuickAddClick={handleQuickAddClick}
              />
            ))}
      </div>
    </div>
  );
}

export default ListProducts;
