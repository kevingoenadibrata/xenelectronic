import {
  Heading,
  IconButton,
  MinusIcon,
  Pane,
  PlusIcon,
  Spinner,
  Text,
} from "evergreen-ui";
import { useEffect, useState } from "react";
import { downloadImage } from "../../constants/storageHandler";
import { useCartContext } from "../../contexts/CartContext";

const CartCard = ({ id, name, imagePath, price, amount }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { addItem, removeItem } = useCartContext();

  const handleAddItem = () => {
    addItem(id, { name, price, imagePath });
  };

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const fetchImage = async () => {
    try {
      const url = await downloadImage(imagePath);
      setImage(url);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchImage();
  }, [imagePath]);

  return (
    <Pane
      display="flex"
      margin={16}
      alignItems="center"
      justifyContent="space-between"
    >
      <Pane display="flex" alignItems="center">
        <Pane
          borderRadius={4}
          width={50}
          height={50}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <Spinner />
          ) : (
            <Pane
              backgroundImage={`url(${image})`}
              backgroundSize="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              width="100%"
              height="100%"
            />
          )}
        </Pane>
        <Pane marginLeft={16}>
          <Heading>{name}</Heading>
          <Text>${price}</Text>
        </Pane>
      </Pane>
      <Pane display="flex" alignItems="center" marginLeft={16}>
        <IconButton
          appearance="minimal"
          icon={MinusIcon}
          onClick={handleRemoveItem}
        />
        <Heading marginX={8}>{amount}</Heading>
        <IconButton
          appearance="minimal"
          icon={PlusIcon}
          onClick={handleAddItem}
        />
      </Pane>
    </Pane>
  );
};

export default CartCard;
