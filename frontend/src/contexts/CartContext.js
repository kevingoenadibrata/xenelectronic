import { set, get } from "js-cookie";
import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import ItemCard from "../components/ItemCard";

const CartContext = createContext();
const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCookie = useCallback(async () => {
    setLoading(true);
    try {
      const cookieData = JSON.parse(get("xenelectronic"));
      if (!cookieData || !cookieData?.cart) {
        setCart([]);
        set("xenelectronic", JSON.stringify({ cart: [] }));
      } else {
        setCart(cookieData.cart);
      }
    } catch {
      setCart([]);
      set("xenelectronic", JSON.stringify({ cart: [] }));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCookie();
  }, [fetchCookie]);

  const addItem = (productId, data) => {
    const temp = [...cart];
    let found = false;

    for (let i = 0; i < temp.length; i++) {
      if (productId === temp[i].id) {
        temp[i].amount++;
        found = true;
        break;
      }
    }

    if (!found) {
      temp.push({ id: productId, amount: 1, data: data });
    }

    setCart(temp);
    set("xenelectronic", JSON.stringify({ cart: temp }));
  };

  const removeItem = (productId) => {
    let temp = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== productId) {
        temp.push(cart[i]);
      } else if (cart[i].amount > 1) {
        temp.push({ ...cart[i], amount: cart[i].amount - 1 });
      }
    }
    setCart(temp);
    set("xenelectronic", JSON.stringify({ cart: temp }));
  };

  const countItems = () => {
    let count = 0;
    cart.forEach((item) => (count += item.amount));
    return count;
  };

  const getTotalPrice = () => {
    let count = 0;
    cart.forEach((item) => (count += item.amount * item.data.price));
    return count.toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
    set("xenelectronic", JSON.stringify({ cart: [] }));
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cart,
        loading,
        clearCart,
        getTotalPrice,
        countItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCartContext };
