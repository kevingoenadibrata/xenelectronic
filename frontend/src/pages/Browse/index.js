import axios from "axios";
import {
  Heading,
  Pane,
  Select,
  SidebarTab,
  Tablist,
  toaster,
} from "evergreen-ui";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ItemCard from "../../components/ItemCard";
import { smallScreenQuery } from "../../constants";

const Browse = () => {
  const isSmallScreen = useMediaQuery(smallScreenQuery);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/xenelectronic/us-central1/api/categories"
      );
      setCategories(res.data);
      setActiveTab(res.data[0].id);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/xenelectronic/us-central1/api/categories/${activeTab}`
      );
      console.log(res.data);
      setItems(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  return (
    <Pane display={isSmallScreen ? "block" : "flex"} marginX={16}>
      <Pane>
        <Pane marginBottom={16} display="flex" alignItems="flex-end">
          <Heading size={900}>Browse</Heading>
          {isSmallScreen && (
            <Pane marginLeft={16}>
              <Select
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
              >
                {categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Pane>
          )}
        </Pane>
        {!isSmallScreen && (
          <Tablist marginBottom={16} width={240} marginRight={24}>
            {categories.map((tab, index) => (
              <SidebarTab
                key={tab.id}
                id={tab.id}
                onSelect={() => setActiveTab(tab.id)}
                isSelected={tab.id === activeTab}
                display={isSmallScreen ? "inline" : "block"}
              >
                {tab.name}
              </SidebarTab>
            ))}
          </Tablist>
        )}
      </Pane>
      <Pane display="flex" flexWrap="wrap" gap={16} marginBottom={64}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            imagePath={item.imagePath}
            price={item.price}
          />
        ))}
      </Pane>
    </Pane>
  );
};

export default Browse;
