import { useState, useEffect } from "react";
import { axiosi } from "../config/axios";

export const useProducts = ({ category, subCategory, sort, page, limit }) => {
  const [products, setProducts] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetchStatus("pending");

        //build query params
        const params = {
          category,
          subCategory,
          sort: sort?.sort,
          order: sort?.order,
          page,
          limit,
        };

        //fetch products
        const response = await axiosi.get("/products", { params });

        setProducts(response.data);
        setTotalCount(response.headers["x-total-count"]);
        setFetchStatus("fulfilled");
      } catch (error) {
        console.log(error);
        setFetchStatus("error");
      }
    };

    fetchProducts();
  }, [category, subCategory, sort, page, limit]);

  return { products, fetchStatus, totalCount };
};
