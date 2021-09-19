import {
  Heading,
  IconButton,
  Pane,
  Pill,
  ShoppingCartIcon,
} from "evergreen-ui";
import { useState } from "react";
import { useHistory } from "react-router";
import { useCartContext } from "../../contexts/CartContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidesheetShown, setIsSidesheetShown] = useState(false);
  const handleCloseSideSheet = () => setIsSidesheetShown(false);
  const history = useHistory();
  const { countItems } = useCartContext();

  return (
    <Pane
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop={24}
      paddingBottom={16}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      backgroundColor="white"
      borderBottom="2px solid #8BC6EC"
      zIndex={5}
    >
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth="1000px"
        marginX={16}
      >
        <Heading
          userSelect="none"
          size={700}
          onClick={() => history.push("/")}
          cursor="pointer"
        >
          XenElectronic
        </Heading>
        <Pane>
          <Pill marginRight={8} color="blue">
            {countItems()}
          </Pill>
          <IconButton
            onClick={() => setIsSidesheetShown(true)}
            icon={ShoppingCartIcon}
          />
        </Pane>
      </Pane>
      <Sidebar
        handleCloseSideSheet={handleCloseSideSheet}
        isShown={isSidesheetShown}
      />
    </Pane>
  );
};

export default Navbar;
