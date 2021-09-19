import axios from "axios";
import { Button, Heading, Pane, ShoppingCartIcon, toaster } from "evergreen-ui";
import { useState } from "react";
import { useHistory } from "react-router";
import CartCard from "../../components/CartCard";
import { useCartContext } from "../../contexts/CartContext";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCartContext();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmitCheckout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5001/xenelectronic/us-central1/api/checkout",
        { cart, totalPrice: getTotalPrice() }
      );
      clearCart();
      history.push("/thankyou");
    } catch (e) {
      toaster.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Pane paddingX={16}>
      <Heading size={700}>Review Your Order</Heading>
      <Pane
        marginTop={16}
        paddingY={16}
        borderBottom="default"
        borderTop="default"
      >
        {cart.map((item) => (
          <CartCard
            name={item.data.name}
            key={item.id}
            id={item.id}
            price={item.data.price}
            imagePath={item.data.imagePath}
            amount={item.amount}
          />
        ))}
      </Pane>
      <Pane
        marginTop={16}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Heading size={700}>Subtotal: ${getTotalPrice()}</Heading>
        <Button
          marginLeft={16}
          appearance="primary"
          iconBefore={ShoppingCartIcon}
          onClick={handleSubmitCheckout}
          isLoading={loading}
        >
          Proceed to Checkout
        </Button>
      </Pane>
    </Pane>
  );
};

export default Checkout;
