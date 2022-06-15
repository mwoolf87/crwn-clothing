import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import React from "react";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
