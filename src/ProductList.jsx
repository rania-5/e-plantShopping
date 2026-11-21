import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (name) => `https://placehold.co/300x300?text=${encodeURIComponent(name)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('Snake Plant'), description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: img('Spider Plant'), description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: img('Peace Lily'), description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: img('Boston Fern'), description: 'Adds humidity to the air and removes toxins.', cost: '$20' },
      { name: 'Rubber Plant', image: img('Rubber Plant'), description: 'Easy to care for and effective at removing toxins.', cost: '$17' },
      { name: 'Aloe Vera', image: img('Aloe Vera'), description: 'Purifies the air and has healing properties for skin.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('Lavender'), description: 'Calming scent, used in aromatherapy.', cost: '$20' },
      { name: 'Jasmine', image: img('Jasmine'), description: 'Sweet fragrance that promotes relaxation.', cost: '$18' },
      { name: 'Rosemary', image: img('Rosemary'), description: 'Invigorating scent, often used in cooking.', cost: '$15' },
      { name: 'Mint', image: img('Mint'), description: 'Refreshing aroma, used in teas and cooking.', cost: '$12' },
      { name: 'Lemon Balm', image: img('Lemon Balm'), description: 'Citrusy scent that relieves stress.', cost: '$14' },
      { name: 'Hyacinth', image: img('Hyacinth'), description: 'Beautiful flowers with a sweet fragrance.', cost: '$22' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('ZZ Plant'), description: 'Thrives in low light and needs little water.', cost: '$25' },
      { name: 'Pothos', image: img('Pothos'), description: 'Tolerates neglect and grows in many conditions.', cost: '$10' },
      { name: 'Cast Iron Plant', image: img('Cast Iron Plant'), description: 'Hardy plant that tolerates low light.', cost: '$20' },
      { name: 'Succulents', image: img('Succulents'), description: 'Drought-tolerant plants in many shapes.', cost: '$18' },
      { name: 'Aglaonema', image: img('Aglaonema'), description: 'Needs minimal care and adds color indoors.', cost: '$22' },
      { name: 'Ponytail Palm', image: img('Ponytail Palm'), description: 'Stores water in its trunk, needs little care.', cost: '$24' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/" onClick={handleHomeClick} className="navbar-brand">
          <h3>Paradise Nursery</h3>
          <i>Where Green Meets Serenity</i>
        </a>
        <div className="navbar-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" onClick={handleCartClick} className="cart-link">
            🛒 <span className="cart-count">{totalItems}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
