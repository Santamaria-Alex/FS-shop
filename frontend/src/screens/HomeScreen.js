import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  //as soon as page loads, useEffect fires off
  //using useEffect to get data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Latest Product</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default HomeScreen;
