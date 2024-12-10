import React, { useEffect } from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { ProductList } from "../features/products/components/ProductList.jsx";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../features/footer/Footer";
import { ProductFeatured } from "../features/products/components/ProductFeatured.jsx";
import ShopByCategory from "../features/products/components/ProductCategoryBanner.jsx";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  return (
    <>
      <Navbar isProductList={true} />
      <div className="pt-[65px]">
        <ProductList />
        <ProductFeatured />
        <ShopByCategory />
        <Footer />
      </div>
    </>
  );
};
