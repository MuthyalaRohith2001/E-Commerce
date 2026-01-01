import React, { useState } from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  font-size: 20px;
  font-weight: 700;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 0.5px solid grey;
  ${mobile({ margin: "5px 0px" })};
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2]; //category from request parameter
  const [filter, seFilters] = useState({}); //Filter size and color
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    seFilters({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Prodcts:</FilterText>
          <Select name="color" onChange={handleFilters} defaultValue="">
            <Option value="" disabled>
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
          </Select>

          <Select name="size" onChange={handleFilters} defaultValue="">
            <Option value="" disabled>
              Size
            </Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            defaultValue="newest"
            onChange={(e) => setSort(e.target.value)}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};
//Parent
//First category is prop is passed to Products.jsx.
//Then category data is fetched and displayed.
// Then again we pass filter(filter,sort) from parent to the child (Product.jsx)
//Then filtered products are displayed.
export default ProductList;
