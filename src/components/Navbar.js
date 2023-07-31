import React from 'react';
import { useSelector } from 'react-redux';
import { CartIcon } from '../icons';

const Navbar = () => {
  // console.log(useSelector((store)=>{
  //     console.log(store);
  // }))
  const amount = useSelector((store) => store.cart.amount);
  // const {amount} = useSelector((state)=>state.cart)
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
