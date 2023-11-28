import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminGetGiftBoxById, AdminUpdateGiftBox } from '../../actions/Admin/AdminAction';

const EditGiftbox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(AdminGetGiftBoxById(productId)).then((productDetails) => {
      setName(productDetails.name);
      setCategory(productDetails.category);
      setPrice(productDetails.price);
      setSalePrice(productDetails.salePrice);
      setStock(productDetails.stock);
      setImage(productDetails.image);
    });
  }, [dispatch, productId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      category,
      price,
      salePrice,
      stock,
    };

    const formData = new FormData();
    formData.append('product', JSON.stringify(updatedProduct));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      // Use dispatch to call the asynchronous action and wait for it to complete
      await dispatch(AdminUpdateGiftBox(productId, formData));

      // After the update is successful, navigate to the admin-products page
      navigate('/admin-edit-giftbox');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit GiftBox</h1>
        <form onSubmit={handleUpdateProduct}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Sale Price:</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
            {image && (
              <img src={image} alt="Product" className="mt-2 max-w-full h-32 object-contain" />
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded-md hover:bg-red-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGiftbox;
