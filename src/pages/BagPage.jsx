import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../App";
import styled from "styled-components";

export default function BagPage() {
//   const { setHeaderData } = useContext(HeaderDataContext);

//   useEffect(() => {
//     setHeaderData({
//       returnButton: false,
//       headerTitle: "My Bag",
//     });
//   }, []);

  return (
    <BagContainer></BagContainer>
  );
}

const BagContainer = styled.div`
    width: 100vw;
    height: 100vh;
`