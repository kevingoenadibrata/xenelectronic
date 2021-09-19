import {
  Button,
  CrossIcon,
  Heading,
  IconButton,
  Pane,
  ShoppingCartIcon,
  SideSheet,
} from "evergreen-ui";
import { useHistory } from "react-router";
import CartCard from "../CartCard";
import { useMediaQuery } from "react-responsive";
import { smallScreenQuery } from "../../constants";
import { useCartContext } from "../../contexts/CartContext";

const Sidebar = ({ isShown, handleCloseSideSheet }) => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery(smallScreenQuery);
  const { cart, getTotalPrice } = useCartContext();

  const handleOnClick = () => {
    handleCloseSideSheet();
    history.push("/checkout");
  };

  return (
    <SideSheet
      width={isSmallScreen ? "100%" : 500}
      preventBodyScrolling
      isShown={isShown}
      onCloseComplete={handleCloseSideSheet}
    >
      <Pane marginX={8}>
        <Pane
          padding={16}
          borderBottom="default"
          display="flex"
          alignItems="center"
        >
          {isSmallScreen && (
            <IconButton
              icon={CrossIcon}
              onClick={handleCloseSideSheet}
              marginRight={16}
            />
          )}
          <Heading size={700}>Your Shopping Cart</Heading>
        </Pane>
        <Pane paddingX={16} marginTop={32}>
          {cart.map((item) => (
            <CartCard
              name={item.data.name}
              price={item.data.price}
              key={item.id}
              id={item.id}
              amount={item.amount}
              imagePath={item.data.imagePath}
            />
          ))}
        </Pane>
        <Pane
          padding={16}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          borderTop="default"
        >
          <Heading size={600} marginRight={16}>
            ${getTotalPrice()}
          </Heading>
          <Button
            appearance="primary"
            iconBefore={ShoppingCartIcon}
            onClick={handleOnClick}
          >
            Checkout
          </Button>
        </Pane>
      </Pane>
    </SideSheet>
  );
};

export default Sidebar;
