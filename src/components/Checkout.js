import React, { useEffect, useState } from "react";
import "../Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import db from '../firebase';
import {useAuth} from '../contexts/AuthContext';
import Subtotal from "./Subtotal";

function Checkout() {
    const {currentUser} = useAuth();
    const [items, setItems] = useState([]);
    const [length, setLength] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (currentUser) {
            db.collection("users").doc(currentUser.uid).get().then(docc => {
                const data = docc.data();
                setTotal(data.subtotal);
                setLength(data.noItems);
            })
        }
    })
    

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("basketItems")
            .onSnapshot((snapshot) => 
            setItems(snapshot.docs.map((doc) => ({
                id: doc.id,
                item: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {items.map(({ id, item }) => (
              <CheckoutProduct 
                key = {id}
                productId = {id}
                title = {item.itemName}
                price = {item.itemPrice}
                image = {item.itemImage}
                rating = {item.itemRating} 
                setLength = {setLength}
                setTotal = {setTotal}
              />
          ))}
        </div>
      </div>
      <div className="checkout__right">
          <Subtotal 
            length = {length}
            total = {total}
          />
      </div>
    </div>
  );
}

export default Checkout;