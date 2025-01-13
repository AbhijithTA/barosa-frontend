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
<<<<<<< Updated upstream
=======
import ShopByCategory from "../features/products/components/ProductCategoryBanner.jsx";
import NewArrivalCategory from "../features/products/components/NewArrivalCategory.jsx";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <Navbar isProductList={true} />
      <ProductList />
      <ProductFeatured />
      <Footer />
=======
      <Navbar/>
      <div className="pt-[65px]">
        <NewArrivalProductComponent />
        <div className="pt-[50px]">
          <NewArrivalCategory />
        </div>
        <div className="pt-[50px]">
          <ProductFeatured />
        </div>
        <ShopByCategory />
        <Footer />
      </div>
>>>>>>> Stashed changes
    </>
  );
};
