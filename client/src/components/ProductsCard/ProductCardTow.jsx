import "./productcardtow.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { addToCartItem } from "../../store/actions/cartActions";

import ProductModal from "../products/ProductModal";
const ProductCardTow = ({ product }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <div className="product-wrap mb-25 ">
        <div className="product-img">
          <Link to={`/product/${product._id}`}>
            <img
              className="default-img"
              src={product.images ? product.images[0].url : ""}
              alt=""
            />
            <img
              className="hover-img"
              src={product.images.length > 1 ? product.images[1].url : ""}
              alt=""
            />
          </Link>
          <div className="product-img-badges">
            {product.discount.isActive && (
              <span className="pink">{product.discount.persent}</span>
            )}
            {product.filter && <span className="purple">{product.filter}</span>}
          </div>
          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button className="" title="Add to wishlist">
                <FavoriteBorderOutlinedIcon />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              <button
                className=""
                title="Add to cart"
                onClick={() => dispatch(addToCartItem(product._id, 1))}>
                {" "}
                <i className="pe-7s-cart"></i> Buy Now
              </button>
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setShow(true)}>
                <VisibilityOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={`/product/${product._id}`}>
              {product.name.substr(0, 20)}
            </Link>
          </h3>
          <div className="product-rating">
            <i className="bi bi-star yellow"></i>
            <i className="bi bi-star yellow"></i>
            <i className="bi bi-star yellow"></i>
            <i className="bi bi-star yellow"></i>
            <i className="bi bi-star"></i>
          </div>
          <div className="product-price">
            <span>৳ {product.price}</span>
            <span className="old">৳ {product.regularPrice}</span>
          </div>
        </div>
      </div>
      {show && <ProductModal show={show} setShow={setShow} id={product._id} />}
    </>
  );
};

export default ProductCardTow;
