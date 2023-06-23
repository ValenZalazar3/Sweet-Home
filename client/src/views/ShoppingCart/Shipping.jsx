import { useDispatch, useSelector } from "react-redux";
import { removefromCart, addtoCart, removeOneFromCart } from "../../Redux/actions/actions";
import { getTotalPrice, calculateTotal } from "../../utils/totalprice"
import fedexLogo from "../../assets/image/Fedex-logo.jpeg";
import dhlLogo from "../../assets/image/DHL-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Shipping = () => {
  const allShoppingCart = useSelector((state) =>  state.shoppingCart.sort((a, b) => a.name.localeCompare(b.name)))
  const [selectedMethod, setSelectedMethod] = useState("method1");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteFromCart = (productId) => {
    dispatch(removefromCart(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
  };

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleReduceFromCart = (product) =>{
    dispatch (removeOneFromCart(product.id))
  }

  const navigateToCheckout = () => {
    navigate("/checkout");
  };
  const subTotal = getTotalPrice(allShoppingCart);
  
  const shippingRate = 8;
  const total = calculateTotal(shippingRate, subTotal);
  const formattedTotal = total.toFixed(2);
  const formattedSubTotal = subTotal.toFixed(2);
  const productCounts = allShoppingCart.reduce((counts, product) => {
    if (counts[product.id]) {
      counts[product.id] += 1;
    } else {
      counts[product.id] = 1;
    }
    return counts;
  }, {});

    
    return (
      <>
       
       <div className=" pt-20 flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">Shipping</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">1</a>
          <span className="font-semibold text-gray-500">Shop</span>
        </li>
        
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
        <a className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold  text-blue-700" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg></a>
             <span className="font-semibold text-gray-900">Shipping</span>
            </li>
        
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">3</a>
          <span className="font-semibold text-gray-900">Payment</span>
        </li>

            </ul>
           </div>
           </div>
            </div>
             <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Select a suitable shipping method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {allShoppingCart?.length === 0 ? (
          <p className="text-gray-400 flex items-center justify-center">Your shopping Cart is empty.</p>
        ) : (
          Object.entries(productCounts).map(([productId, count]) => {
            const product = allShoppingCart.find((prod) => prod.id === productId);
            const totalPrice = product.price * count;
            const formattedTotalPrice = totalPrice.toFixed(2)

            return (
              <div key={product.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={product.image} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{product.name}</span>
                    <button className="ml-auto" onClick={() => handleDeleteFromCart(product.id)}>X</button>
                  </div>
                  <p className="text-lg font-bold">${product.price}</p>
                  <div className="flex">
                    <p className="text-sm text-gray-500 mt-3">Quantity: {count}</p>
                    <button className="mt-3 mb-5 ml-2 w-10 rounded-md bg-gray-900 px-0.5 py-.5 font-medium text-white" onClick={() => handleAddToCart(product)}>+</button>
                    <button className="mt-3 mb-5 ml-2 w-10 rounded-md bg-gray-900 px-0.5 py-.5 font-medium text-white" onClick={() => handleReduceFromCart(product)}>-</button>
                  </div>
                  <p className="text-sm text-gray-500">Total Price: ${formattedTotalPrice}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">${formattedSubTotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">${shippingRate}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">${formattedTotal}</p>
      </div>
      <p className="text-black-400 mt-2 text-m text-left"> <a className="text-blue-600" href="#" onClick={navigateToCheckout}> &lt; Return to information</a></p>
            </div>
        
              <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 mr:auto h-full flex flex-col justify-between">
            <div>
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
              
                <div className="relative">
              <div className= {`shopping-method ${selectedMethod === "method1" ? "selected" : ""}`}
        onClick={() => handleMethodSelection("method1")}>
               <input className="peer hidden" id="radio_1" type="radio" name="radio"  />
               <span className={`method-label ${selectedMethod === "method1" ? "selected" : ""}`}>
        </span>               
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
         <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <img className="w-14 object-contain" src={fedexLogo} alt="" />
                <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
               </div>
                </label>  
                </div>
              </div>
             
              <div className="relative">
              <div className={`shopping-method ${selectedMethod === "method2" ? "selected" : ""}`}
        onClick={() => handleMethodSelection("method2")}>
               <input className="peer hidden" id="radio_2" type="radio" name="radio"  />
               <span className={`method-label ${selectedMethod === "method2" ? "selected" : ""}`}>
        </span>               
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
         <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <img className="w-14 object-contain" src={dhlLogo} alt="" />
                <div className="ml-5">
              <span className="mt-2 font-semibold">DHL Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
               </div>
                </label>  
                </div>
              </div>

                </form>

                </div>
  <button className="mt-auto mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
    Continue to payment
  </button>
    </div>
    
    </div>
        </>

        );
};

export default Shipping;