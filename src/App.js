import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Charts from "./pages/Charts";
import Orders from "./pages/Orders";
import Modals from "./pages/Modals";
import Accordion from "./pages/Accordion";
import Users from "./pages/Users";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";

const App = () => {
 
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:customerId" element={<Customer />} />
          <Route path="products" element={<Products />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/cart" element={<Cart />} />
          <Route path="shop/:productId" element={<Product />} />
          <Route path="charts" element={<Charts />} />
          <Route path="accordion" element={<Accordion />} />
          <Route path="modals" element={<Modals />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Error404 />} />
          <Route path="error500" element={< Error500 />} />
          <Route path="error404" element={< Error404 />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App;