import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, you would use axios or fetch to get data from your API
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Logout is now handled by the Layout component

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Dashboard</h2>
          <p>Welcome to Fake Store Admin Panel</p>
        </Col>
      </Row>

      <Row className="mb-4">
        {[
          { title: "Products", value: 20, icon: "fa-box", color: "primary" },
          { title: "Categories", value: 4, icon: "fa-tags", color: "success" },
          {
            title: "Orders",
            value: 12,
            icon: "fa-shopping-cart",
            color: "warning",
          },
          { title: "Users", value: 8, icon: "fa-users", color: "info" },
        ].map((item, idx) => (
          <Col md={3} className="mb-3" key={idx}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className={`bg-${item.color} text-white rounded-circle p-3 me-3`}
                  >
                    <i className={`fas ${item.icon} fa-lg`}></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">{item.title}</h6>
                    <h3 className="mb-0 fw-bold">{item.value}</h3>
                  </div>
                </div>

                <div>
                  <div className="progress" style={{ height: "5px" }}>
                    <div
                      className={`progress-bar bg-${item.color}`}
                      role="progressbar"
                      style={{ width: `${item.value * 5}%` }}
                      aria-valuenow={item.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mb-3">Recent Products</h3>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={3} key={product.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow">
                {/* Product Image */}
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                    className="hover-scale"
                  />
                </div>

                {/* Body */}
                <Card.Body>
                  <Card.Title
                    className="text-truncate"
                    title={product.title}
                    style={{ fontSize: "1rem", fontWeight: 600 }}
                  >
                    {product.title}
                  </Card.Title>

                  <Card.Text
                    className="text-truncate text-muted"
                    title={product.description}
                    style={{ fontSize: "0.875rem" }}
                  >
                    {product.description}
                  </Card.Text>

                  <Card.Text
                    className="fw-bold text-secondary"
                    style={{ fontSize: "1.1rem" }}
                  >
                    ${product.price.toFixed(2)}
                  </Card.Text>
                </Card.Body>

                <Card.Footer className="bg-white border-0">
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-100 rounded-pill"
                  >
                    <i className="fas fa-eye me-2"></i> View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Dashboard;
