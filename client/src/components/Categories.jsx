import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./Categoryitem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })};
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((iteam) => (
        <CategoryItem iteam={iteam} key={iteam.id} />
      ))}
    </Container>
  );
};

export default Categories;
