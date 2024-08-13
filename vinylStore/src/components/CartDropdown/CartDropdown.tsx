import React, { useEffect, useState } from 'react';
import type { Vinyl } from '../../Interfaces/Interfaces';
import './CartDropdown.css';

const CartDropdown: React.FC = () => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [refresh, setRefresh] = useState(false); // Dummy state to trigger re-render

  const loadCart = () => {
    setVinyls(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]') : []);
  };

  useEffect(() => {
    loadCart();
  }, [refresh]);

  const clearCart = () => {
    localStorage.removeItem('cart');
    //setVinyls([]);
    window.location.reload();
  };

  const refreshComponent = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-header">
      
      <h3>Your Cart</h3>
      <button className="refresh-button" onClick={refreshComponent}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
           <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
         </svg>
      </button>
      </div>
      
      {!vinyls || vinyls.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {vinyls.map((vinyl, index) => (
              <li key={index} className={vinyls.length > 1 ? 'with-divider' : ''}>
                <img src={vinyl.coverImage} alt={vinyl.title} />
                <div>
                  <p>{vinyl.title}</p>
                  <p>${vinyl.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className='empty-button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
          </svg> 
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;