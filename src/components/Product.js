import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { SideBySideMagnifier } from "react-image-magnifiers";

const Product = () => {
  let details = useLocation().state.product;
  console.log(details)
  let productDetail = {
    name: details.name,
    description: details.description.split(","),
    price: details.price,
    image: details.image
  }
  console.log('detail: ', productDetail);
  return (
    <div>
      <text>Product Detail Page</text>
      <br />
      {/* {productDetail.name}
      <br />
      {productDetail.description}
      <br />
      {productDetail.price}
      <br />
      {productDetail.image} */}
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 60, marginTop: 30 }}>
        <img src={productDetail.image} height={700} width={600} />
        {/* <SideBySideMagnifier
          imageSrc={productDetail.image}
          imageAlt="image"
          style={{ width: 600, height: 500 }}
        /> */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 'larger' }}>{productDetail.name}</div>
          <br />
          <div style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 'larger' }}>Rs. {productDetail.price}</div>
          <div style={{ marginLeft: 20, color: 'green' }}>inclusive of all taxes</div>
          <br />
          <br />
          <div style={{ marginLeft: 20, fontWeight: 'bold' }}>Product Details</div>
          <ul>
            {
              productDetail.description.map((obj, index) => {
                return (
                  <li style={{color: 'black'}}>
                    {obj}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )

}

export default Product;
