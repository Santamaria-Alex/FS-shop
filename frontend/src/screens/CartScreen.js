import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  //get item id
  const { id } = useParams();
  console.log(id);

  //get qty inputed from user
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  console.log(qty);

  //useDispatch is used to dispatch an action, while useSelector is used to get the state from the redux store
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]); //dependencies: if either change, useEffect fires off

  return <div>CartScreen</div>;
};

export default CartScreen;
