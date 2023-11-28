import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { AdminGetProductById, AdminUpdateProduct } from '../../actions/Admin/AdminAction';

const EditProduct = () => {


  const [name, setName] = useState(null);
   
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [discountprice, setDiscountPrice] = useState(null);
    const [category, setCategory] = useState(null);
    // const [parentcategory, setParentCategory] = useState(null);
    // const [childcategory, setChildCategory] = useState(null);
    // const [tags, setTags] = useState(null);
    // const [countyoforigin, setCountryOfOrigin] = useState(null);
    // const [material, setMaterial] = useState(null);
    // const [dimensions, setDimensions] = useState(null);
    // const [images, setImages] = useState(null);
    // const [havePersonalization, sethavePersonalisation] = useState(false);
    // const [personalizationType, setPersonalizationType] = useState(null);
  // const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const params = useParams();



  

  useEffect(() => {
    getproductdetails();
    
  }, []);

  const getproductdetails = async () => {
    console.warn(params);
    try {
      let response = await fetch(`http://localhost:5000/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let result = await response.json(); 
  
      console.warn(result);
      setName(result.name);
      setCategory(result.category);
      setPrice(result.price);
      setDiscountPrice(result.discountprice);
      setQuantity(result.quantity);
      setImageFile(result.imageFile);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

  };

  return (
    
<div className="flex items-center justify-center h-full">
                      <AdminSidebar name={'products'} />

      <div className="w-full max-w-md p-8 bg-white rounded shadow-md overflow-y-auto max-h-screen">

        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleUpdateProduct}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 ">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Sale Price:</label>
            <input
              type="number"
              value={discountprice}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Stock:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
            {imageFile && (
              <img src={imageFile} alt="Product" className="mt-2 max-w-full h-32 object-contain" />
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded-lg hover:bg-red-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
