import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]); //stores fetched data from database using an array, returned data is objects documents
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:3000/api/products?category=${category}`
            : "http://localhost:3000/api/products"
        );
        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);
  //Fetching data from database and storing in an array

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filter]);
  /*Converting object into an array Object.entries() */
  /*runs any one of this dependencies updated */
  /*filter() returns an array of object documents */

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => {
        const sorted = [...prev].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log("Sorted products (newest):", sorted);
        return sorted;
      });
    } else if (sort === "asc") {
      // price low → high
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      // default: price high → low
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((iteam) => (
            <Product iteam={iteam} key={iteam._id} />
          ))
        : products.slice(0,8).map((iteam) => <Product iteam={iteam} key={iteam._id} />)}
    </Container>
  );
};
//Fetching data from database now

export default Products;
