import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HeaderDataContext } from "../../App";
import favoriteIcon from "../../assets/icons/favorite-icon/inactivefavoritebutton.svg"

export default function ProductsList(props) {
  const { productsList } = props;
  const navigate = useNavigate();
  const { setHeaderTitle } = useContext(HeaderDataContext);

  function productClick(id, title) {
    setHeaderTitle(`${title}`);
    navigate(`${id}`);
  }

  return (
    <ProductsListContainer>
      {productsList.map((product) => {
        return (
          <Product
            key={product._id}
            onClick={() => productClick(product._id, product.title)}
          >
            <div>
              <img src={product.thumbnail} alt="" />
              <img
                src={favoriteIcon}
                alt=""
              />
            </div>
            <h2>{product.brand}</h2>
            <h1>{product.title}</h1>
            <span>{`${product.price.cents / 100}$`}</span>
          </Product>
        );
      })}
    </ProductsListContainer>
  );
}

const ProductsListContainer = styled.div`
  padding-top: 70px;
  padding-bottom: 140px;
  display: flex;
  gap: 13px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Product = styled.div`
  max-width: 45vw;
  div {
    position: relative;
  }
  img:first-of-type {
    border-radius: 8px;
    height: 50vw;
    width: 45vw;
    object-fit: cover;
  }
  img:last-of-type {
    position: absolute;
    right: 0;
    width: 11vw;
    bottom: -5vw;
  }
  h2 {
    max-width: 40vw;
    margin-bottom: 2px;
    font-family: Montserrat;
    font-weight: 400;
    color: #9b9b9b;
    font-size: 11px;
    line-height: 11px;
    letter-spacing: 0em;
    text-align: left;
  }
  h1 {
    color: #222222;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 3px;
  }
  span {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
`;
