import { useEffect, useState, useRef } from "react";
import ListProducts from "./components/ListProducts";
import Nav from "./components/Nav";
import ProductSheet from "./components/ProductSheet";
import CartSheet from "./components/CartSheet";
import Filters from "./components/Filters";
import data from "./data.json";

interface Cart {
  idProduct: number;
  quantity: number;
}

interface Filter {
  artist: string;
  isChecked: boolean;
}

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

function App() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [idProductClicked, setIdProductClicked] = useState(-1);
  const [cartOnscreen, setCartOnScreen] = useState(false);
  const isFirstRender = useRef(true);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  function handleAddToCartClick(idProduct: number, quantity: number) {
    if (quantity > 0 && quantity < 100) {
      const updateCart = [...cart];
      if (updateCart.some((cartItem) => cartItem.idProduct === idProduct)) {
        updateCart[
          updateCart.findIndex((cartItem) => cartItem.idProduct === idProduct)
        ].quantity += quantity;
      } else {
        const cartElement: Cart = {
          idProduct: idProduct,
          quantity: quantity,
        };
        updateCart.push(cartElement);
      }
      setCart(updateCart);
    }
  }

  useEffect(() => {
    if (filters.some((filter) => filter.isChecked === true)) {
      setIsFilterActive(true);
    } else {
      setIsFilterActive(false);
    }
  }, [filters]);

  useEffect(() => {
    const cartStorage = window.localStorage.getItem("cart");
    const updateFilters: Filter[] = data.reduce(
      (acc: Filter[], product: Product) => {
        const isProductInFilters = acc.find(
          (item: Filter) => item.artist === product.artist
        );
        if (!isProductInFilters) {
          acc.push({ artist: product.artist, isChecked: false });
        }
        return acc;
      },
      []
    );
    setFilters(updateFilters);

    if (cartStorage) {
      const updateCart = [...JSON.parse(cartStorage)];
      setCart(updateCart);
    } else {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, []);
  useEffect(() => {
    if (!isFirstRender.current) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      isFirstRender.current = false;
    }
  }, [cart]);

  function handleProductClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
    if (
      event.target instanceof HTMLButtonElement === false &&
      (event.target as HTMLElement).tagName !== "path" &&
      (event.target as HTMLElement).tagName !== "svg"
    ) {
      setIdProductClicked(id);
    }
  }

  function handleCrossClick(idProduct: number) {
    const updateCart = [...cart];
    updateCart.splice(
      updateCart.findIndex(
        (cartElement) => cartElement.idProduct === idProduct
      ),
      1
    );
    setCart(updateCart);
  }

  function handleMinusClick(idProduct: number) {
    const updateCart = [...cart];
    if (
      updateCart[
        updateCart.findIndex(
          (cartElement) => cartElement.idProduct === idProduct
        )
      ].quantity > 1
    ) {
      updateCart[
        updateCart.findIndex(
          (cartElement) => cartElement.idProduct === idProduct
        )
      ].quantity--;
      setCart(updateCart);
    } else {
      handleCrossClick(idProduct);
    }
  }

  function handlePlusClick(idProduct: number) {
    const updateCart = [...cart];
    updateCart[
      updateCart.findIndex((cartElement) => cartElement.idProduct === idProduct)
    ].quantity++;
    setCart(updateCart);
  }

  function handleInputCheck(artist: string) {
    const updateFilters: Filter[] = [...filters];
    updateFilters[
      updateFilters.findIndex((filter) => filter.artist === artist)
    ].isChecked =
      !updateFilters[
        updateFilters.findIndex((filter) => filter.artist === artist)
      ].isChecked;
    setFilters(updateFilters);
  }

  return cartOnscreen ? (
    <>
      <Nav
        cart={cart}
        handleProductsClick={() => {
          setIdProductClicked(-1);
          setCartOnScreen(false);
        }}
        handleCartClick={() => setCartOnScreen(true)}
      />
      <CartSheet
        cart={cart}
        handleCrossClick={handleCrossClick}
        handleMinusClick={handleMinusClick}
        handlePlusClick={handlePlusClick}
        handleTrashClick={() => setCart([])}
      />
    </>
  ) : (
    <>
      <Nav
        cart={cart}
        handleProductsClick={() => {
          setIdProductClicked(-1);
          setCartOnScreen(false);
        }}
        handleCartClick={() => setCartOnScreen(true)}
      />
      <Filters handleInputCheck={handleInputCheck} filtersArray={filters} />
      {idProductClicked === -1 ? (
        <ListProducts
          handleQuickAddClick={handleAddToCartClick}
          handleProductClick={handleProductClick}
          filters={filters}
          isFilterActive={isFilterActive}
        />
      ) : (
        <ProductSheet
          idProduct={idProductClicked}
          handleAddToCartClick={handleAddToCartClick}
        />
      )}
    </>
  );
}

export default App;
