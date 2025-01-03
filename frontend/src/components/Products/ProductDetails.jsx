import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import Ratings from "./Ratings";
import { server } from "../../server";

const ProductDetails = ({ data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.images[select]?.url}
                  alt={data.name} 
                  className="w-full object-cover max-h-[500px]" 
                />
                <div className="w-full flex mt-2 overflow-x-auto">
                  {data.images.map((i, index) => (
                    <div
                      className={`cursor-pointer mr-2 ${select === index ? "border-2 border-primary" : "border border-gray-300"}`}
                      key={index}
                      onClick={() => setSelect(index)}
                    >
                      <img
                        src={i.url}
                        alt={`${data.name} - ${index + 1}`} 
                        className="h-[100px] w-[100px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 800px:pl-5">
                <h1 className={`${styles.productTitle} text-2xl font-bold`}>{data.name}</h1>
                <p className="mt-2">{data.description}</p>
                <div className="flex pt-3 items-center">
                  <h4 className={`${styles.productDiscountPrice} text-xl font-semibold`}>
                    Rs.{data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price} line-through ml-2 text-gray-500`}>
                      Rs.{data.originalPrice}
                    </h3>
                  )}
                </div>

                <div className="flex items-center pt-8 border-t border-gray-300 mt-5">
                  <Link to={`/shop/preview/${data?.shop._id}`} className="flex items-center">
                    <img
                      src={data?.shop?.avatar?.url}
                      alt={data.shop.name} 
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name} font-semibold`}>{data.shop.name}</h3>
                      <h5 className="text-[15px] text-gray-600">({averageRating}/5) Ratings</h5>
                    </div>
                  </Link>
                  <button
                    className={`${styles.button} bg-primary text-white ml-auto rounded h-11 px-4`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f6fb] px-3 800px:px-10 py-5 rounded mt-5">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2">Product Details</h2>
            <p className="text-gray-700">{data.description}</p>

            <h2 className="text-xl font-semibold mt-5 mb-3 border-b pb-2">Product Reviews</h2>
            <div className="max-h-[40vh] overflow-y-auto">
              {data.reviews && data.reviews.length > 0 ? (
                data.reviews.map((item, index) => (
                  <div className="flex my-3 border-b pb-3" key={index}>
                    <img
                      src={item.user.avatar?.url}
                      alt={item.user.name}
                      className="w-[40px] h-[40px] rounded-full mr-2"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium mr-2">{item.user.name}</h3>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-gray-700 text-sm mt-1">{item.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No Reviews for this product!</p>
              )}
            </div>

            <h2 className="text-xl font-semibold mt-5 mb-3 border-b pb-2">Seller Information</h2>
            <div className="flex items-center">
              <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                <img
                  src={data?.shop?.avatar?.url}
                  alt={data.shop.name}
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div>
                  <h3 className={`${styles.shop_name} font-semibold`}>{data.shop.name}</h3>
                </div>
              </Link>
            </div>
            <p className="mt-2 text-gray-700">{data.shop.description}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { server } from "../../server";
// import styles from "../../styles/styles";
// import { toast } from "react-toastify";
// import Ratings from "./Ratings";
// import axios from "axios";

// const ProductDetails = ({ data }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const { products } = useSelector((state) => state.products);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(getAllProductsShop(data && data?.shop._id));
//   //   if (wishlist && wishlist.find((i) => i._id === data?._id)) {
//   //     setClick(true);
//   //   } else {
//   //     setClick(false);
//   //   }
//   // }, [data, wishlist]);

//   // const incrementCount = () => {
//   //   setCount(count + 1);
//   // };

//   // const decrementCount = () => {
//   //   if (count > 1) {
//   //     setCount(count - 1);
//   //   }
//   // };

//   // const removeFromWishlistHandler = (data) => {
//   //   setClick(!click);
//   //   dispatch(removeFromWishlist(data));
//   // };

//   // const addToWishlistHandler = (data) => {
//   //   setClick(!click);
//   //   dispatch(addToWishlist(data));
//   // };

//   // const addToCartHandler = (id) => {
//   //   const isItemExists = cart && cart.find((i) => i._id === id);
//   //   if (isItemExists) {
//   //     toast.error("Item already in cart!");
//   //   } else {
//   //     if (data.stock < 1) {
//   //       toast.error("Product stock limited!");
//   //     } else {
//   //       const cartData = { ...data, qty: count };
//   //       dispatch(addTocart(cartData));
//   //       toast.success("Item added to cart successfully!");
//   //     }
//   //   }
//   // };

//   const totalReviewsLength =
//     products &&
//     products.reduce((acc, product) => acc + product.reviews.length, 0);

//   const totalRatings =
//     products &&
//     products.reduce(
//       (acc, product) =>
//         acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
//       0
//     );

//   const avg = totalRatings / totalReviewsLength || 0;

//   const averageRating = avg.toFixed(2);

//   const handleMessageSubmit = async () => {
//     if (isAuthenticated) {
//       const groupTitle = data._id + user._id;
//       const userId = user._id;
//       const sellerId = data.shop._id;
//       await axios
//         .post(`${server}/conversation/create-new-conversation`, {
//           groupTitle,
//           userId,
//           sellerId,
//         })
//         .then((res) => {
//           navigate(`/inbox?${res.data.conversation._id}`);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//     } else {
//       toast.error("Please login to create a conversation");
//     }
//   };

//   return (
//     <div className="bg-white">
//       {data ? (
//         <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
//           <div className="w-full py-5">
//             <div className="block w-full 800px:flex">
//               <div className="w-full 800px:w-[50%]">
//                 <img
//                   src={`${data && data.images[select]?.url}`}
//                   alt=""
//                   className="w-[80%]"
//                 />
//                 <div className="w-full flex">
//                   {data &&
//                     data.images.map((i, index) => (
//                       <div
//                         className={`${
//                           select === index ? "border" : "null"
//                         } cursor-pointer`}
//                         key={index}
//                       >
//                         <img
//                           src={`${i?.url}`}
//                           alt=""
//                           className="h-[200px] overflow-hidden mr-3 mt-3"
//                           onClick={() => setSelect(index)}
//                         />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               <div className="w-full 800px:w-[50%] pt-5 pl-5">
//                 <h1 className={`${styles.productTitle}`}>{data.name}</h1>
//                 <p>{data.description}</p>
//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>
//                     Rs.{data.discountPrice}
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     {data.originalPrice ? `Rs.${data.originalPrice}` : null}
//                   </h3>
//                 </div>

//                 <div className="flex items-center mt-12 justify-between pr-3">
                
//                 </div>
              
//                 <div className="flex items-center pt-8">
//                   <Link to={`/shop/preview/${data?.shop._id}`}>
//                     <img
//                       src={`${data?.shop?.avatar?.url}`}
//                       alt=""
//                       className="w-[50px] h-[50px] rounded-full mr-2"
//                     />
//                   </Link>
//                   <div className="pr-8">
//                     <Link to={`/shop/preview/${data?.shop._id}`}>
//                       <h3 className={`${styles.shop_name} pb-1 pt-1`}>
//                         {data.shop.name}
//                       </h3>
//                     </Link>
//                     <h5 className="pb-3 text-[15px]">
//                       ({averageRating}/5) Ratings
//                     </h5>
//                   </div>
//                   <div
//                     className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
//                     onClick={handleMessageSubmit}
//                   >
//                     <span className="text-white flex items-center">
//                       Send Message <AiOutlineMessage className="ml-1" />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ProductDetailsInfo
//             data={data}
//             products={products}
//             totalReviewsLength={totalReviewsLength}
//             averageRating={averageRating}
//           />
//           <br />
//           <br />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const ProductDetailsInfo = ({
//   data,
//   products,
//   totalReviewsLength,
//   averageRating,
// }) => {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(1)}
//           >
//             Product Details
//           </h5>
//           {active === 1 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(2)}
//           >
//             Product Reviews
//           </h5>
//           {active === 2 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(3)}
//           >
//             Seller Information
//           </h5>
//           {active === 3 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//       </div>
//       {active === 1 ? (
//         <>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             {data.description}
//           </p>
//         </>
//       ) : null}

//       {active === 2 ? (
//         <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
//           {data && data.reviews && data.reviews.length > 0 ? (
//             data.reviews.map((item, index) => (
//               <div className="w-full flex my-2" key={index}>
//                 <img
//                   src={`${item.user.avatar?.url}`}
//                   alt=""
//                   className="w-[50px] h-[50px] rounded-full"
//                 />
//                 <div className="pl-2">
//                   <div className="w-full flex items-center">
//                     <h1 className="font-[500] mr-3">{item.user.name}</h1>
//                     <Ratings rating={item.rating} />
//                   </div>
//                   <p>{item.comment}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <h5>No Reviews for this product!</h5>
//           )}
//         </div>
//       ) : null}

//       {active === 3 && (
//         <div className="w-full block 800px:flex p-5">
//           <div className="w-full 800px:w-[50%]">
//             <Link to={`/shop/preview/${data.shop._id}`}>
//               <div className="flex items-center">
//                 <img
//                   src={`${data?.shop?.avatar?.url}`}
//                   className="w-[50px] h-[50px] rounded-full"
//                   alt=""
//                 />
//                 <div className="pl-3">
//                   <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
//                   <h5 className="pb-2 text-[15px]">
//                     ({averageRating}/5) Ratings
//                   </h5>
//                 </div>
//               </div>
//             </Link>
//             <p className="pt-2">{data.shop.description}</p>
//           </div>
//           <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
//             <div className="text-left">
//               <h5 className="font-[600]">
//                 Joined on:{" "}
//                 <span className="font-[500]">
//                   {data.shop?.createdAt?.slice(0, 10)}
//                 </span>
//               </h5>
//               <h5 className="font-[600] pt-3">
//                 Total Products:{" "}
//                 <span className="font-[500]">{products && products.length}</span>
//               </h5>
//               <h5 className="font-[600] pt-3">
//                 Total Reviews:{" "}
//                 <span className="font-[500]">{totalReviewsLength}</span>
//               </h5>
//               <Link to={`/shop/preview/${data?.shop._id}`}>
//                 <div
//                   className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
//                 >
//                   <h4 className="text-white">Visit Shop</h4>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
