import type { Product } from "@/components/ui/ProductCard";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const { user } = useUser();


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Product Management</h2>
          <p>Manage Product in the system</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" className="rounded-pill">
            <FaUserPlus className="me-2" /> Add New Product
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center g-4">
        {products.map((product) => (
          <Col xs="auto">
            <ProductCard
              {...product}
              key={product.id}
              addcart={() => {
                addToCart(product, user?.id || "");
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
