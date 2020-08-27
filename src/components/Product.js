import React from 'react';
import { useLocation } from 'react-router-dom';

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
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 60, marginTop: 50 }}>
        <img src={productDetail.image} height={700} width={600} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 60 }}>
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
