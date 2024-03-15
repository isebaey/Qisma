import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/app/Layout/Layout";
import Home from "./Components/app/Home/Home";
import Cart from "./Components/app/Cart/Cart";
import Brands from "./Components/app/Brands/Brands";
import Categories from "./Components/app/Categories/Categories";
import Products from "./Components/app/Products/Products";
import WishList from "./Components/app/WishList/WishList";
import NotFound from "./Components/app/NotFound/NotFound";
import Product from "./Components/Product/Product";
import SignIn from "./Components/SignIn/SignIn";
import Checkout from "./Components/Checkout/Checkout";
import SignUp from "./Components/SignUp/SignUp";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import CategoryItem from "./Components/CategoryItem/CategoryItem";
import BrandItem from "./Components/BrandItem/BrandItem";
import AuthenticationContextProvider from "./Context/AuthenticationContext";
import WishlistProvider from "./Context/WishlistContext";
import CartProvider from "./Context/CartContext";
import Thanks from "./Components/Thanks";
import Order from "./Components/Order/Order";
import Orders from "./Components/Orders/Orders";
import Profile from "./Components/Profile/Profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

let routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "brands", element: <Brands /> },
      { path: "home", element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/:categoryId", element: <CategoryItem /> },
      { path: "brands/:brandId", element: <BrandItem /> },
      { path: "products", element: <Products /> },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "products/:id", element: <Product /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "thanks",
        element: (
          <ProtectedRoute>
            <Thanks />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "signup", element: <SignUp /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifycode", element: <VerifyCode /> },
      { path: "signin", element: <SignIn /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={routers}></RouterProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthenticationContextProvider>
      <Toaster />
    </>
  );
}

export default App;
