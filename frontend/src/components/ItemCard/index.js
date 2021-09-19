import {
  Button,
  Card,
  Heading,
  Pane,
  PlusIcon,
  Spinner,
  Text,
  toaster,
} from "evergreen-ui";
import { useEffect, useState } from "react";
import { downloadImage } from "../../constants/storageHandler";
import { useCartContext } from "../../contexts/CartContext";

const ItemCard = ({ id, name, price, imagePath }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { addItem } = useCartContext();

  const handleAddToCart = () => {
    addItem(id, { name, price, imagePath });
    toaster.success(`Added ${name} to Cart`);
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
    <Card
      width={150}
      height={350}
      display="grid"
      gridTemplateRows="150px auto"
      border="default"
      borderRadius={8}
      overflow="hidden"
    >
      <Pane
        padding={16}
        borderBottom="default"
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
      <Pane
        padding={16}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Pane>
          <Heading size={400}>{name}</Heading>
          <Text>${price}</Text>
        </Pane>
        <Pane display="flex" justifyContent="center">
          <Button iconBefore={PlusIcon} onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Pane>
      </Pane>
    </Card>
  );
};

export default ItemCard;
