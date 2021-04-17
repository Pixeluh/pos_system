/* /pages/login.js */
import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";


import Cart from "../components/cart/";

import { useRouter } from "next/router";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PointOfSaleItems from ".";
/** trying */
const GET_DISHES = gql`
{
    pointofsales {
      id
      name
      type
      price
      qty
    }
  }
`;


function Success() {
    const appContext = useContext(AppContext);
    const { cart, isAuthenticated } = appContext;
    const router = useRouter();
//     const { loading, error, data } = useQuery(GET_DISHES, {
//         variables: { id: router.query.id },
//     });
//     if (error) return "Error Loading Dishes";
//   if (loading) return <h1>Loading ...</h1>;
//   if (data.pointofsales) {
//     const { pointofsales } = data;
//   }

    // isAuthenticated is passed to the cart component to display order button

  return (
    <Container style={{padding: "20px"}}>
        <Row >
        <Card style={{ padding: "10px 5px", margin: "0 auto"}} className="cart" id="cart-card">
        <CardTitle style={{ margin: 10 }}>Order confirmed!</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                
                // console.log("./////////////")
                // const newKey = key[index].id
                // console.log(".///////////// NEW KEY", newKey)
                // console.log("index: " , index, "key: ", key[index].id);
                // console.log("pos", data.pointofsales[(item.id)-1].qty);
                
                //console.log(item);  
                //console.log(item.id);

                  if (item.quantity > 0) {
                      
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp; ${item.price}</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                              
                            {item.quantity}x
                            </span>
                        </div>
                      </div>
                    );
                  }
                  
                })
              : null
              }
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                    <h3>${appContext.cart.total.toFixed(2)}</h3>
                  </Badge>
                </div>
              ) : (
                <>
                  
                </>
              )
            ) : (
              <h5>Login to Order</h5>
            )}
          </div>
          
          {console.log(router.pathname)}
          
        </CardBody>
      </Card>
        </Row>
    </Container>
  );
}

export default Success;