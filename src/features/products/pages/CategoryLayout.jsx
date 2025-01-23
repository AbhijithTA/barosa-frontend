import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosi } from "../../../config/axios";
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

const CategoryLayout = () => {
  const { categoryTitle } = useParams(); // Get category title from URL
  const [products, setProducts] = useState([]); // Products state
  const [filters, setFilters] = useState({}); // Filters state
  const [fetchStatus, setFetchStatus] = useState("idle"); // Fetch status
  const [categories, setCategories] = useState([]); // Categories data
  const [subCategories, setSubCategories] = useState([]); // Subcategories for current category
  const [sort, setSort] = useState(null); // Sort state

  const sortOptions = [
    { name: "Price: low to high", sort: "price", order: "asc" },
    { name: "Price: high to low", sort: "price", order: "desc" },
  ];

  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosi.get("/categories");
        setCategories(response.data); // Store categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Update subcategories when categoryTitle changes
  useEffect(() => {
    const currentCategory = categories.find(
      (category) => category.name.toLowerCase() === categoryTitle.toLowerCase()
    );
    setSubCategories(currentCategory?.subCategory || []); // Update subcategories
  }, [categoryTitle, categories]);

  

  // Sort useeffect

  //  useEffect(()=>{
  //         const finalFilters={...filters}
  
  //         finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
  //         finalFilters['sort']=sort
  
        
          
  //     },[filters,sort,page])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetchStatus("pending"); // Set status to pending
  
        // Ensure sort parameters are extracted correctly
        const params = sort
          ? { sort: sort.sort, order: sort.order }
          : undefined;
  
        // Fetch products with sort and order parameters
        const productResponse = await axiosi.get(
          `/products/latest-products/${categoryTitle}`,
          { params }
        );
  
        // Update products state
        setProducts(productResponse.data);
        setFetchStatus("fulfilled"); // Set status to fulfilled
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetchStatus("error"); // Set status to error
      }
    };
  
    fetchProducts();
  }, [categoryTitle, sort]); // Add `sort` as a dependency
  
  


  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-[65px]">
        {/* Left Sidebar (Filters & Subcategories) */}
        <div className="w-[20vw] p-1 sm:p-4 border-r border-gray-200">
          <h2 className="font-bold text-lg mb-4">{categoryTitle}</h2>

          {subCategories.length > 0 ? (
            <ul>
              {subCategories.map((subCategory) => (
                <li
                  key={subCategory._id}
                  className="text-gray-700 border-b-[1px] py-1 text-sm sm:text-md"
                >
                  {subCategory.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No subcategories available.</p>
          )}
        </div>

        {/* Right Content (Product List) */}
        <div className="flex-1 p-6">
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            columnGap={5}
          >

              {/* Sort option */}
             
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
                  No products found for this category.
                </p>
              )}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryLayout;
