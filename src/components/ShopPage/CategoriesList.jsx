// import Category from "./Category";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Categories(props) {
  const { list } = props;
  const navigate = useNavigate();

  function categoryClick(categ) {
    const { gender, category } = categ;
    const lowerCasedCategory = category.toLowerCase();
    navigate(`/shop/${gender}/${lowerCasedCategory}`);
  }

  return (
    <CategoriesContainer>
      {list.map((category) => {
        return (
          <Category
            onClick={() => categoryClick(category)}
            key={category.category}
          >
            <div>
              <h4>{category.category}</h4>
            </div>
            <img src={category.thumb} alt="" />
          </Category>
        );
      })}
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 14px;
`;

const Category = styled.div`
  background-color: #ffffff;
  width: 90%;
  height: 100px;
  display: flex;
  border-radius: 8px;
  div {
    display: flex;
    align-items: center;
    padding-left: 15px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 50%;
    background-color: #ffffff;
    h4 {
      font-family: Montserrat;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: left;
    }
  }
  img {
    width: 50%;
    object-fit: cover;
    object-position: center;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
