import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";

export const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState({});


  const [isAnyImageUploading, setIsAnyImageUploading] = useState(false);


  useEffect(() => {
    if (productAddStatus === "fullfilled") {
      reset();
      toast.success("New product added");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Error adding product, please try again later");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    const category = categories.find((cat) => cat._id === categoryId);
    if (category) {
      setSubCategories(category.subCategory || []);
    } else {
      setSubCategories([]);
    }
  };

  const handleFileUpload = async (file, index) => {
    try {
      setUploadingImages((prev) => ({ ...prev, [index]: true }));
      setIsAnyImageUploading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_cloudinary");
      data.append("cloud_name", "dlgy2avhv");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlgy2avhv/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await res.json();

      // Update the uploaded images state
      setUploadedImageUrls((prev) => [...prev, result.url]);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImages((prev) => ({ ...prev, [index]: false }));

      setIsAnyImageUploading(Object.values(uploadingImages).some((status) => status));

    }
  };

  // const handleAddProduct = async (data) => {
  //   try {
  //     setLoading(true);

  //     // Extract files from the form data
  //     const files = [data.image0[0], data.image1[0], data.image2[0], data.image3[0]];

  //     // Upload files to Cloudinary
  //     const imageUrls = await Promise.all(
  //       files.map((file) => (file ? handleFileUpload(file) : null))
  //     );

  //     setUploadedImageUrls(imageUrls);
  //     setLoading(false);

  //     // Construct the product payload
  //     const newProduct = {
  //       ...data,
  //       images: imageUrls.filter((url) => url !== null),
  //     };

  //     // Clean up file inputs from the payload
  //     delete newProduct.image0;
  //     delete newProduct.image1;
  //     delete newProduct.image2;
  //     delete newProduct.image3;

  //     dispatch(addProductAsync(newProduct));
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Failed to add product");
  //   }
  // };

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      images: uploadedImageUrls,
    };
    dispatch(addProductAsync(newProduct));
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* Field Area */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Name
            </Typography>
            <TextField
              {...register("title", { required: "Title is required" })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                {...register("category", { required: "category is required" })}
                labelId="category-selection"
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Tooltip
              title={!selectedCategoryId ? "Select a category first" : ""}
              arrow
            >
              <FormControl fullWidth>
                <InputLabel id="subcategory-selection">
                  Sub Category
                </InputLabel>
                <Select
                  {...register("subCategory", {
                    required: "Sub Category is required",
                  })}
                  labelId="subcategory-selection"
                  label="Sub Category"
                  disabled={!selectedCategoryId}
                >
                  {subCategories.map((subCat) => (
                    <MenuItem value={subCat._id}>{subCat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Price is required" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? "%" : "Percentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "discount percentage is required",
                })}
              />
            </Stack>
          </Stack>

          <Stack spacing={2}>
  <Typography variant="h6" fontWeight={400} gutterBottom>
    Stock Quantity by Size
  </Typography>
  {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
    <Stack direction="row" alignItems="center" spacing={2} key={size}>
      <Typography variant="body1" sx={{ width: "4rem" }}>
        {size}
      </Typography>
      <TextField
        type="number"
        {...register(`stockQuantity.${size}`, {
          required: `${size} stock quantity is required`,
          min: { value: 0, message: "Stock cannot be negative" },
        })}

        label={`Stock for ${size}`}
        fullWidth
        defaultValue={0}
      />
    </Stack>
  ))}
</Stack>

<Stack rowGap={2}>
          <Typography variant="h6" gutterBottom>
            Upload Images
          </Typography>
          {[0, 1, 2, 3].map((index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={2}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0], index);
                  }
                }}
              />
              {uploadingImages[index] && <CircularProgress size={20} />}
            </Stack>
          ))}
        </Stack>


          {/* {loading && (
            <Stack alignItems="center" sx={{ marginTop: 2 }}>
              <CircularProgress />
              <Typography variant="body2">Uploading...</Typography>
            </Stack>
          )} */}
        </Stack>

        {/* Action Area */}
        <Stack
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={is480 ? 1 : 2}
        >
          <Button size={is480 ? "medium" : "large"} variant="contained" type="submit" disabled={isAnyImageUploading || loading}>
            Add Product
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            variant="outlined"
            color="error"
            component={Link}
            to={"/admin/dashboard"}
             
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
