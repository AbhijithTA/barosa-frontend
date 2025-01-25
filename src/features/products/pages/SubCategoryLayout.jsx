import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "../../navigation/components/Navbar";

import {
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";
import { ProductCard } from "../components/ProductCard";
import { useTheme } from "@emotion/react";
import { useProducts } from "../../../hooks/useProducts";
import { axiosi } from "../../../config/axios";

const SubcategoryLayout = () => {
  const { categoryTitle, subCategoryTitle } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [sort, setSort] = useState(null);

  const { products, fetchStatus, totalCount } = useProducts({
    category: categoryTitle,
    subCategory: subCategoryTitle,
    sort,
    page: 1,
    limit: 10,
  });

  const sortOptions = [
    { name: "price: low to high", sort: "price", order: "asc" },
    { name: "price: high to low", sort: "price", order: "desc" },
  ];

  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  //fetch the subCategories based on the categoryTitle
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axiosi.get(`/categories/${categoryTitle}`);
        setSubCategories(response.data.subCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    if (categoryTitle) fetchSubCategories();
  }, [categoryTitle]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-[65px]">
        {/* left side bar */}
        <div className="w-[20vw] p-1 sm:p-4 border-r border-gray-200">
          <h2 className="text-lg font-bold mb-4">{categoryTitle}</h2>
          {subCategories.length > 0 ? (
            <ul>
              {subCategories.map((subCategory) => (
                <li
                  key={subCategory._id}
                  className={`text-gray-700 border-b-[1px] py-1 text-sm sm:text-md ${
                    subCategory.name === subCategoryTitle ? "font-bold" : ""
                  }`}
                >
                  {subCategory.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">NO Subcategories available</p>
          )}
        </div>

        {/* right content (proudct list) */}

        <div className="flex-1 p-6">
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h3 className="text-lg font-bold">
              Showing products for: {subCategoryTitle || categoryTitle}
            </h3>
            {/* Sort Dropdown */}
            <Stack alignSelf={"flex-end"} width={"12rem"}>
              <FormControl fullWidth>
                <InputLabel id="sort-dropdown">Sort</InputLabel>
                <Select
                  variant="standard"
                  labelId="sort-dropdown"
                  label="Sort"
                  onChange={(e) =>
                    setSort(
                      sortOptions.find(
                        (option) => option.name === e.target.value
                      )
                    )
                  }
                  value={sort?.name || null}
                >
                  <MenuItem value={null}>Reset</MenuItem>
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          {/* Products */}
          {fetchStatus === "pending" ? (
            <Stack
              width="100%"
              height="calc(100vh - 4rem)"
              justifyContent="center"
              alignItems="center"
            >
              <Lottie animationData={loadingAnimation} />
            </Stack>
          ) : fetchStatus === "error" ? (
            <p className="text-center text-red-500">
              Failed to load products. Please try again later.
            </p>
          ) : (
            <Grid
              gap={is700 ? 1 : 2}
              container
              justifyContent={"center"}
              alignContent={"center"}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    thumbnail={product.thumbnail}
                    brand={product.brand?.name || "Unknown"}
                    price={product.price}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">
                  No products found for this subcategory.
                </p>
              )}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default SubcategoryLayout;
