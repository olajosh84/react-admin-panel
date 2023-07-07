import { Routes, Route } from "react-router-dom";
import {SharedLayout, ScrollToTop} from "./components";
import {
  Dashboard,Customers,Customer,Products,Shop,
  Product,Charts,Orders,Modals,Accordion,Users,
  User,Cart,Error404,Error500} from "./pages";

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
      {/*scroll page to top on route change */}
      <ScrollToTop />
    </div>
  )
}
export default App;