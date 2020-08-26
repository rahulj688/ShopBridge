import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Inventory from './Inventory';

export default class Home extends React.PureComponent {
  constructor() {
    super();
    // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      imgFile: ''
    }

  }

  // forceUpdateHandler() {
  //   this.forceUpdate();
  // };

  fileSelected = (file) => {
    this.setState({ productDetails: '' })
    var reader = new FileReader(); 
    var fileContent;
    reader.readAsDataURL(file[0]);
    var me = this; 
    reader.onload = () => { 
      fileContent = reader.result; 
      console.log(fileContent);
      this.setState({
        image: fileContent
      })
    }
  }

  addPrdouctToInventory = () => {
    // console.log("uri: ", window.URL.createObjectURL(this.state.fileInput[0])); 
    // var reader = new FileReader(); 
    // var fileContent;
    // reader.readAsDataURL(this.state.fileInput[0]);
    // var me = this; 
    // reader.onload = () => { 
    //   fileContent = reader.result; 
    //   console.log(fileContent);
    //   this.setState({
    //     image: fileContent
    //   })
    // }
    console.log("image: ", this.state.image);
    let product = 
      {
        "name": this.state.name,
        "image": this.state.image,
        "description": this.state.description,
        "price": parseInt(this.state.price)
      }
      this.setState({ productDetails: product })
     fetch('https://5f44abf43fb92f0016753a78.mockapi.io/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      })
      .then((data) => {
        let d = data;
        console.log('submit: ', d)
      })
      .catch((error) => {
        console.log('err: ', error)
      })
      this.setState({
        name: '',
        description: '',
        price: '',
        fileInput: ''
      })
    // this.forceUpdateHandler();
  }

  render() {
    return (
      <div style={{ backgroundColor: 'lightgray', height: 200, marginLeft: 20, marginRight: 20, borderRadius: 10 }}>
        <div style={{ marginTop: 10 }}>
          <h3 style={{ marginTop: 10, marginLeft: 20 }}>Add a New Product to Inventory</h3>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
            <form>

              <label htmlFor="name" style={{ marginLeft: 30 }}>Name:</label>
              <input type="text" value={this.state.name} placeholder="Name of Product" required style={{ height: 25, marginLeft: 10, marginTop: 3, borderRadius: 3 }} onChange={(e) => this.setState({ name: e.target.value, productDetails: '' })} />

              <label htmlFor="description" style={{ marginLeft: 20 }}>Description:</label>
              <textarea value={this.state.description} placeholder="Enter Description of Product separated by comma(,)" rows="3" required cols="30" style={{ marginLeft: 10, borderRadius: 5 }} onChange={(e) => this.setState({ description: e.target.value, productDetails: '' })} ></textarea>

              <label htmlFor="price" style={{ marginLeft: 20 }}>Price:</label>
              <input type="text" value={this.state.price} pattern="[0-9]+" placeholder="Price of Product" required style={{ height: 25, marginLeft: 10, marginTop: 3, borderRadius: 3 }} onChange={(e) => this.setState({ price: e.target.value, productDetails: '' })} />

              <label htmlFor="myfile" style={{ marginLeft: 20 }} >Select a file:</label>
              <input type="file" accept="image/*" id="myfile" value={this.state.fileInput} style={{ marginLeft: 10, width: 290 }} name="myfile" onChange={(e) => this.fileSelected(e.target.files)} />
              <input type="button" onClick={() => this.addPrdouctToInventory()} value="Submit" disabled={(this.state.name && this.state.price && this.state.description) ? false : true} />
            </form>
          </div>
        </div>
        {/* <Button variant="primary" style={{marginLeft: 650, marginTop: 10}} onClick={() => this.addPrdouctToInventory()} >Show Products</Button> */}
        {/* {
          this.state.showProduct && */}
          <Inventory productDetail={this.state.productDetails} />
        {/* // } */}
      </div>
    )
  }
}
