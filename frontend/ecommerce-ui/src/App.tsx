import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { MainNavBar } from "./components/Navbar";
import ProductList from "./pages/ProductList";
import CreateUser from "./pages/CreateUser";
import ListCustomer from "./pages/ListCustomer";
import CreateOrder from "./pages/CreateOrder";
import ListOrder from "./pages/ListOrder";

function App() {
  return (
      <>
          <MainNavBar />
          <Container className="mb-4">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/list-customer" element={<ListCustomer />} />
                  <Route path="/create-customer" element={<CreateUser />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/create-order" element={<CreateOrder />} />
                  <Route path="/list-order" element={<ListOrder />} />
              </Routes>
          </Container>
      </>
  );
}

export default App;
