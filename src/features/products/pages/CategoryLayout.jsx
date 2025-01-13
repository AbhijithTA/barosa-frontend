import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosi } from "../../../config/axios";
import { Navbar } from "../../navigation/components/Navbar";
import FilterPanel from "../components/FilterPanel";
import { Stack, Grid } from "@mui/material";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";
import { ProductCard } from "../components/ProductCard";

const CategoryLayout = () => {
  const { categoryTitle } = useParams(); // Get category title from URL
  const [products, setProducts] = useState([]); // Products state
  const [filters, setFilters] = useState({}); // Filters state
  const [fetchStatus, setFetchStatus] = useState("idle"); // Fetch status

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetchStatus("pending"); // Set status to pending

        // Fetch products
        const productResponse = await axiosi.get(
          `/products/latest-products/${categoryTitle}`,
          { params: filters }
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
  }, [categoryTitle, filters]);

  return (
    <div className="flex h-screen mt-[65px]">
      {/* Navbar */}
      <Navbar />

      {/* Left Sidebar (Filters) */}
      <div className="w-1/4 p-4 border-r border-gray-200">
        <h2 className="font-bold text-lg mb-4">{categoryTitle}</h2>
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      {/* Right Content (Product List) */}
      <div className="flex-1 p-4">
        {fetchStatus === "pending" ? (
          // Loading animation
          <Stack
            width="100%"
            height="calc(100vh - 4rem)"
            justifyContent="center"
            alignItems="center"
          >
            <Lottie animationData={loadingAnimation} />
          </Stack>
        ) : fetchStatus === "error" ? (
          // Error message
          <p className="text-center text-red-500">
            Failed to load products. Please try again later.
          </p>
        ) : (
          // Product grid
          <Grid container spacing={2}>
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
  );
};

export default CategoryLayout;
