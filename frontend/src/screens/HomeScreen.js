import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { search, pageNumber } = useParams();
  // console.log(pageNumber);
  // console.log(search);

  //DONT NEED THIS WHEN USING REDUX
  // const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  //useSelector grabs data from the state, in this case productList
  const productList = useSelector((state) => state.productList);
  //get loading, error and products from productList
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(search, pageNumber));
  }, [dispatch, search, pageNumber]);

  //GOING TO USE REDUX INSTEAD OF AXIOS TO GET DATA
  //as soon as page loads, useEffect fires off
  //using useEffect to get data from backend
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");

  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      <Meta />
      {!search ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      <main className="py-3">
        <Container>
          <h1>Latest Product</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => {
                  return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  );
                })}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                search={search ? search : ""}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export default HomeScreen;
