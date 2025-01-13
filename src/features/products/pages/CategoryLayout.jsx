import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Stack, Grid } from "@mui/material";
import { ProductCard } from "../components/ProductCard";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";
import { Navbar } from "../../navigation/components/Navbar";
import { selectProducts, selectProductStatus } from "../ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProductFetchStatus } from "../ProductSlice";



const CategoryLayout = () => {
  const { categoryTitle } = useParams();
  const [subcategories, setSubcategories] = useState([]);
 
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const products = useSelector(selectProducts);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch subcategories
  //       const subcategoryResponse = await axios.get(`/api/subcategories?category=${categoryTitle}`);
  //       setSubcategories(subcategoryResponse.data);

  //       // Fetch products
  //       const productResponse = await axios.get(`/api/products?category=${categoryTitle}`);
  //       setProducts(productResponse.data);

  //       setProductFetchStatus("fulfilled");
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setProductFetchStatus("error");
  //     }
  //   };

  //   fetchData();
  // }, [categoryTitle]);

  return (
    <div className="flex h-screen mt-[65px]">

      <Navbar/>
      {/* Left Menu */}
      <div className="w-1/6 p-4">
        <h2 className="font-bold text-lg mb-4">{categoryTitle}</h2>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory._id} className="mb-2">
              {subcategory.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Products */}
      <div className="w-3/4 p-4">
        {productFetchStatus === "pending" ? (
          <Stack
            width={"100%"}
            height={"calc(100vh - 4rem)"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Lottie animationData={loadingAnimation} />
          </Stack>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                thumbnail={product.thumbnail}
                brand={product.brand.name}
                price={product.price}
                handleAddRemoveFromWishlist={() => {}}
              />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default CategoryLayout;
