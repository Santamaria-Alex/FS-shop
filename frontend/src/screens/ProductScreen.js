import React, { useEffect } from "react";
import {
  ButtonGroup,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";

const ProductScreen = ({}) => {
  const { id } = useParams(); //useParams gets the parameters of the url, in this case we need the id
  // const product = products.find((p) => p._id === id);

  //DONT NEED THIS WHEN USING REDUX
  // const [product, setProduct] = useState({});

  //GOING TO USE REDUX INSTEAD OF AXIOS TO GET DATA
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${id}`);

  //     setProduct(data);
  //   };

  //   fetchProduct();
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    //bring in from productActions.js, id comes from useParams
    dispatch(listProductDetails(id));
  }, [dispatch]);

  const product = [];

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <ButtonGroup
                  className="btn btn-dark"
                  type="button"
                  disabled={product.countInStock == 0}
                >
                  Add to Cart
                </ButtonGroup>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
