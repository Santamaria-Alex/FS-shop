import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";

const SearchBox = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }

    setSearch("");
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <Form.Control
          type="text"
          name="q"
          id="q"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button
          id="button-search"
          type="submit"
          variant="oultine-primary"
          className="p-2"
        ></Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
