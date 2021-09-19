import { Pane } from "evergreen-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import Browse from "./pages/Browse";
import Checkout from "./pages/Checkout";
import Thankyou from "./pages/Thankyou";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Pane width="100%" display="flex" justifyContent="center">
          <Pane paddingTop={128} width="100%" maxWidth="1000px">
            <Switch>
              <Route exact path="/" component={Browse} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/thankyou" component={Thankyou} />
            </Switch>
          </Pane>
        </Pane>
      </CartProvider>
    </Router>
  );
}

export default App;
