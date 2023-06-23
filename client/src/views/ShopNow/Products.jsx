import Cards from "../../components/Card/Cards";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByPrice,
  filterByName,
  getCategory,
  getProducts,

} from "../../Redux/actions/actions.js"
import SearchBar from "./SearchBar";
import './Products.css'

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);

  const [productPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
   dispatch(filterByCategory())
  }, [dispatch]);

  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const productsToDisplay = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function handleOrderName(event) {
    event.preventDefault();
    dispatch(filterByName(event.target.value));
    setCurrentPage(1);
  }

  function handleOrderPrice(event) {
    event.preventDefault();
    dispatch(filterByPrice(event.target.value));
    setCurrentPage(1);
  }

  function handleFilterCategory(event) {
    event.preventDefault();
    dispatch(filterByCategory(event.target.value));
    setCurrentPage(1);
  }

  
  function handleClick(event) {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(getProducts());
    window.location.reload();
  }
  
  return (
    
    <div className="all">
      <div className="flex justify-center">
          <SearchBar />
       </div>
      <div className="flex cursor-pointer select-none justify-center h-16 items-center ">
        <div className="border border-gray-300">         
        <select className="ordAndFil1" onChange={(event) => handleOrderName(event)}>
          <option>Order by Name</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
        <select className="ordAndFil2" onChange={(event) => handleOrderPrice(event)}>
          <option>Price</option>
          <option value="high">High to Low</option>
          <option value="low">Low to High</option>
        </select>
        <select className="ordAndFil3"
          onChange={(event) => handleFilterCategory(event)}
          defaultValue={"default"}
        >
          <option value="default" disabled>
            Category
          </option>
          { category?.map((el) => (
            <option key={el._id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        </div>
          <button className="text-gray-900 cursor-pointer select-none bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-2 mr-4 ml-2" onClick={ (event) => handleClick (event)}>Reload filter</button>
        <div className="flex justify-center">
      <Pagination
        productPerPage={productPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={allProducts.length}
      />
      </div>
      </div>
      <div className="grid grid-cols-4 gap-12">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            
            <div key={product._id} className="flex justify-center">
              <Cards
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                // description={product.description}
                category= {product.category.map((el) => el.name)}
              />
              
            </div>
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
      <br />
      <div className="flex justify-center">
      <Pagination
        productPerPage={productPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={allProducts.length}
      />
      </div>
      <div className="text-center mt-6">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={backToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Products;