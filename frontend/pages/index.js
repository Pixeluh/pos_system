
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";


import Cart from "../components/cart/";
import AppContext from "../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_DISHES = gql`
{
    pointofsales {
      id
      name
      type
      price
      qty
      image {url}
    }
  }
`;

function PointOfSaleItems() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.pointofsales) {
    const { pointofsales } = data;
    return (
      <>
        <h1>{pointofsales.name}</h1>
        <Row>
          { pointofsales.map((res) => (
            <Col xs="2" sm="2" style={{ padding: 3}} key={res.id}>
              <Card style={{ margin: "0 10px",  width: 180}}>
                <CardImg
                  top={true}
                  style={{ height: 150, width: 180 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody style={{ height: 100, padding: "11px"}}>
                  <CardTitle><h5>{res.name}</h5></CardTitle>
                  <CardText><b>Qty: {res.qty}</b>
                  <br/>${res.price}</CardText>
                </CardBody>
                <div className="card-footer">
                  {res.qty == 0 && 
                  <h4>SOLD OUT</h4>}
                  {res.qty !== 0 &&
                    <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    <b><h4>Add to Cart</h4></b>
                  </Button>}
                
                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Col xs="2" style={{ padding: 0, position: "fixed", top: "200px", right:"0" }}>
            <div>
                <Cart />
            </div>
        </Col>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}
export default PointOfSaleItems;