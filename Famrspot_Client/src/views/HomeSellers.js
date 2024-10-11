import React, { useState, useEffect } from "react";
import { uploadProduct, uploadAdditionalImages } from "../api/api";
import { useNavigate } from "react-router-dom";

//import components
import SellerProductGrid from "../components/SellerProductGrid";

const HomeSellers = () => {
  const [uid, setUID] = useState("");
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("Vegetable")
  const [productLat, setProductLat] = useState(null);
  const [productLng, setProductLng] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProductLat(position.coords.latitude);
          setProductLng(position.coords.longitude);
          sessionStorage.setItem('product_lat', position.coords.latitude);
    sessionStorage.setItem('product_lng', position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };


  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    const storedUID = sessionStorage.getItem("uid");
    setUID(storedUID);
    const uName = sessionStorage.getItem("username");
    setUserName(uName);
    console.log(uid);
  }, [uid]);

  console.log(uid);
  console.log(sessionStorage.getItem('product_lat'));
  console.log(sessionStorage.getItem('product_lng'));

  const [productData, setProductData] = useState({
    name: "",
    uid: "",
    price: 0,
    description: "",
    category: category,
    mainImage: "",
    pprice: null,
    stock: 0,
    product_lat: null,
    product_lng: null,
  });
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
      uid: uid,
      product_lat: sessionStorage.getItem('product_lat'),
      product_lng: sessionStorage.getItem('product_lng'),
    }));
  };

  const handleAdditionalImagesChange = (e) => {
    setAdditionalImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload product data
      const productResponse = await uploadProduct(productData);
      console.log('LOL' + productResponse);

      console.log(productResponse.id);

      console.log(additionalImages);

      if (productResponse.message === "Product created successfully") {
        await uploadAdditionalImages(
          productResponse.product.id,
          additionalImages
        );
      }

      // Upload additional images
      // if (additionalImages.length > 0) {
      //
      // }

      alert("Product and images uploaded successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while uploading.");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/sign-in");
  };

  return (
    <div>
      <div className="w-screen top-0 fixed h-[70px] bg-green-500 mb-10 flex flex-row items-center justify-between">
        <div className="px-5">
          <h1 className="text-2xl uppercase font-extrabold text-white">
            Seller Dashboard
          </h1>
        </div>
        <div className="text-white text-xl px-10 flex flex-row gap-2">
          <p>Seller: </p>
          <p>{userName}</p>
          <button
            onClick={handleLogout}
            className="bg-green-700 rounded-md text-sm px-2"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-10 p-10">
        <h1 className="mb-8 font-extrabold text-4xl">
          Add a New <span className="text-green-500">Selling</span> Item
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div>
              <label className="block font-semibold" htmlFor="name">
                Product Name
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-md p-4 border-none block mt-1"
                id="name"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleProductChange}
                required
                autoFocus
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="price">
                Price
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-md p-4 border-none block mt-1"
                id="price"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleProductChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="description">
                Description
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-md p-4 border-none block mt-1"
                id="description"
                type="text"
                name="description"
                value={productData.description}
                onChange={handleProductChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold" htmlFor="description">
                Available Stock
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-md p-4 border-none block mt-1"
                id="stock"
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleProductChange}
                required
              />
            </div>


            <div className="w-full flex flex-col gap-2">
              <label className="block font-semibold">Category</label>
              <select
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-md p-4 border-none block mt-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Plants">Plants</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="mainImage">
                Display Image
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black p-4 border-none block mt-1"
                id="mainImage"
                type="file"
                name="mainImage"
                onChange={handleProductChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold" htmlFor="additionalImages">
                Additional Images
              </label>
              <input
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black p-4 border-none block mt-1"
                id="additionalImages"
                type="file"
                name="additionalImages"
                multiple
                onChange={handleAdditionalImagesChange}
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
              >
                Post
              </button>
              <a className="cursor-pointer text-blue-300">
                Have a problem? Contact Admin
              </a>
            </div>
          </form>

          <aside className="">
            <h1 className="text-xl font-bold mb-5" >ADD YOUR LOCATION FIRST!!!</h1>
          {productLat ? 
          
          <h1 className="text-xl text-green-500">Location Succesfully Added</h1>
          
           : 
           
           <button
                onClick={handleGetLocation}
                className="flex items-center mb-5 justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
              >
                Get Current Location
              </button>
           
           }

           
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  All users must provide valid details of the
                  Vegetables/Fruits/Plants you are selling
                </li>
                <li>Users must provide authentic product images</li>
                <li>
                  Users must not create multiple posts of the same product you
                  are selling
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div>
          <SellerProductGrid />
        </div>
      </div>
    </div>
  );
};

export default HomeSellers;
