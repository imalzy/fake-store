import React from "react";
import { Card } from "react-bootstrap";
import { BsBagPlus, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "./ProductCard.css";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating: Rating;
}

type ProductCardProps = Product & {
  addcart: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  addcart,
}) => {
  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i)
        stars.push(<BsStarFill key={i} className="text-warning me-1" />);
      else if (rate >= i - 0.5)
        stars.push(<BsStarHalf key={i} className="text-warning me-1" />);
      else stars.push(<BsStar key={i} className="text-warning me-1" />);
    }
    return stars;
  };

  return (
    <Card className="product-card fixed-card">
      <a href="#" className="text-decoration-none text-dark">
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="product-img"
        />
        <Card.Body className="px-3 py-2">
          <span className="text-muted text-uppercase small">{category}</span>
          <Card.Title className="fw-bold text-capitalize text-truncate mt-1 fs-6">
            {title}
          </Card.Title>

          <div className="d-flex align-items-center mt-2">
            <p className="fw-semibold fs-6 mb-0">${price}</p>
            <div className="ms-auto d-flex align-items-center">
              {renderStars(rating?.rate || 0)}
            </div>
          </div>

          <div className="mt-2 d-flex justify-content-end">
            <BsBagPlus size={18} onClick={()=>addcart()} />
          </div>
        </Card.Body>
      </a>
    </Card>
  );
};

export default ProductCard;
