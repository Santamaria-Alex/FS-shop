import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";

const HomeScreen = () => {
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
