import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { HeaderDataContext } from "../../App";
import { MagnifyingGlass } from "react-loader-spinner";
import favoriteIcon from "../../assets/icons/favorite-icon/inactivefavoritebutton.svg";

export default function ProductContent(props) {
  const { id } = useParams();
  const { setHeaderButton, setHeaderTitle } = useContext(HeaderDataContext);
  const [product, setProduct] = useState();
  const [onCart, setOnCart] = useState(false);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderButton(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${process.env.REACT_APP_LINK_API}/product/details/${id}`, config)
      .then((res) => {
        const productInfo = res.data;
        setHeaderTitle(productInfo.title);
        setProduct(productInfo);
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate(-1);
      });
  }, []);

  function addToCart() {
    if (!selected) {
      return alert("Please, select size");
    }
    const { token } = localStorage.getItem("token");
    const config = {
      headers: {
        Authorizarion: `Bearer ${token}`,
      },
    };
    axios
      .post(`${process.env.REACT_APP_LINK_API}/cart/${selected}`, {}, config)
      .then(() => {
        setOnCart(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selectSize(e) {
    const selectedSize = e.target.value;
    const selectedSku = product.skus.find((sku) => sku.size === selectedSize);
    setSelected(selectedSku._id);
  }

  if (!product) {
    return (
      <Loading>
        <MagnifyingGlass width={110} height={110} color="#4d3837" />
      </Loading>
    );
  }

  return (
    <ProductContainer>
      <ProductImages>
        <img src={product.thumbnail} alt="" />
        {product.images.map((image) => {
          return <img key={image} src={image} alt="" />;
        })}
      </ProductImages>
      <SizeSelection>
        <div>
          {product.skus.some((sku) => sku.stock > 0) ? (
            <select onChange={selectSize}>
              {!selected && (
                <option value="" defaultValue="">
                  Sizes
                </option>
              )}

              {product.skus.map((sku) => {
                if (sku.stock > 0) {
                  return (
                    <option key={sku._id} value={sku.size}>
                      {sku.size}
                    </option>
                  );
                }
              })}
            </select>
          ) : (
            <p>"ESGOTADO"</p>
          )}
        </div>
        <img src={favoriteIcon} alt="" />
      </SizeSelection>
      <ProductInfo>
        <div>
          <h1>{product.subCategory}</h1>
          <h2>{product.brand}</h2>
        </div>
        <span>${product.price.cents / 100}</span>
      </ProductInfo>
      <ProductDescription>
        <p>{product.description}</p>
      </ProductDescription>
      <AddFooter>
        <div>
          <button onClick={addToCart}>
            {onCart ? "ON THE CART" : "ADD TO CART"}
          </button>
        </div>
      </AddFooter>
    </ProductContainer>
  );
}

const ProductDescription = styled.div`
  padding-left: 14px;
  padding-right: 14px;
  margin-top: 15px;
  padding-bottom: 100px;
  p {
    font-family: Montserrat;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.15000000596046448px;
    text-align: left;
    color: #222222;
  }
`;

const ProductInfo = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 14px;
  padding-right: 14px;
  h1 {
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
    color: #222222;
  }
  h2 {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
    line-height: 11px;
    letter-spacing: 0em;
    text-align: left;
    color: #9b9b9b;
  }
  span {
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: right;
    color: #222222;
  }
`;

const AddFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: #ffffff;
  box-shadow: 0px -4px 20px 0px #0000000f;
  width: 100%;
  height: 13vh;
  position: fixed;
  bottom: 0;
  left: 0;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      color: #ffffff;
      background-color: #4d3837;
      border-radius: 24px;
      width: 90%;
      height: 48px;
      border: none;
      font-family: Montserrat;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;

      :hover {
        background-color: #392a29;
      }
    }
  }
`;

const SizeSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  img {
    width: 40px;
  }
  > div p {
    color: red;
    font-size: 16px;
  }
  div:first-child select {
    border: 0.4px solid #9b9b9b;
    width: 35vw;
    padding: 10px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    background-color: #ffffff;
    option {
      font-family: Montserrat;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
`;

const ProductImages = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  img {
    width: 70vw;
  }
`;

const ProductContainer = styled.div`
  overflow-x: hidden;
  background-color: #f9f9f9;
  padding-top: 40px;
  width: 100vw;
  height: 100vh;
`;

const Loading = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35vh;
`;
