import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonGroup,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { useLocation, useParams } from "react-router";

const CartScreen = () => {
  //   const match = useParams();
  //   const productID = match.id;
  //   console.log(productID);
  //   //   console.log(id);

  //   const { search } = useLocation().search;
  //   const name = new URLSearchParams(search).get("name");
  //   console.log(name);

  return <div>CartScreen</div>;
};

export default CartScreen;
