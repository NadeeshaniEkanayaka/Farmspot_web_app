import axios from "axios";

// Function to add a product
export const uploadProduct = async (productData) => {
  try {
    const formData = new FormData();

    // Append form fields to formData
    formData.append("uid", productData.uid);
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("mainImage", productData.mainImage);
    formData.append("pprice", productData.pprice);
    formData.append("stock", productData.stock);
    formData.append("product_lat", productData.product_lat);
    formData.append("product_lng", productData.product_lng);

    // Send POST request
    const response = await axios.post(
      "http://localhost:5000/api/products/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};

// Function to add additional images
export const uploadAdditionalImages = async (productId, images) => {
  console.log(productId);
  try {
    const formData = new FormData();
    formData.append("productId", productId);
    // Append images to formData with the correct field name
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    // Send POST request
    const response = await axios.post(
      `http://localhost:5000/api/products/additionalImages/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading additional images:", error);
    throw error;
  }
};
