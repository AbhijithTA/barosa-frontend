import { selectProducts, selectProductStatus } from "../ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProductFetchStatus } from "../ProductSlice";
import { ProductCard } from "./ProductCard";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ProductFeatured = () => {
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const products = useSelector(selectProducts);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { setRedirectAction } = useRedirect();

  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      if (!loggedInUser) {
        // Save the pending action
        // setRedirectAction(() => () => {
        //   const data = { user: loggedInUser._id, product: productId };
        //   dispatch(createWishlistItemAsync(data)); // Perform action after login
        //   navigate("/"); // Redirect to the homepage
        // });

        navigate("/login"); // Redirect to login
      } else {
        const data = { user: loggedInUser._id, product: productId };
        dispatch(createWishlistItemAsync(data)); // Directly add to wishlist
      }
    } else {
      const index = wishlistItems.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
      }
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-2xl mb-8 font-semibold">
        FEATURED PRODUCT
      </h1>
      {productFetchStatus === "pending" ? (
        <Stack
          width={is500 ? "35vh" : "25rem"}
          height={"calc(100vh - 4rem)"}
          justifyContent={"center"}
          marginRight={"auto"}
          marginLeft={"auto"}
        >
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <>
          {/* Product grid */}
          <Grid
            gap={is700 ? 1 : 2}
            container
            justifyContent={"center"}
            alignContent={"center"}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                thumbnail={product.thumbnail}
                brand={product.brand.name}
                price={product.price}
                handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
              />
            ))}
          </Grid>
          <div className="bg-black/70 text-white text-center py-8 mt-8 overflow-hidden">
            <motion.div
              className="whitespace-nowrap font-bold text-lg gap-10 flex"
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
            >
              <div className="flex items-center gap-10">
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
              </div>
              <div className="flex items-center gap-10">
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
              </div>
              <div className="flex items-center gap-10">
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
                <p> Free delivery above order 49 dirhams! 🚚 </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};
