import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
// import { Table } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    // let currentInventory = this.state.inventoryProducts;
    // let inventory = [
    //   {
    //     name: 'Highlander White Slim Fit Casual Shirt',
    //     description: 'White casual shirt, has a spread collar, a full button placket, a patch pocket, long sleeves with roll-up button tabs, a curved hemline, 100% Cotton, Machine Wash, Long Sleeves, Slim Fit',
    //     price: '800',
    //     image: image1
    //   },
    //   {
    //     name: 'Men Red & Black Regular Fit Checked Casual Shirt',
    //     description: 'Red and black checked casual shirt, has a spread collar, button placket, 1 pocket, long sleeves, curved hem, 100% cotton, Machine-wash, Long Sleeves',
    //     price: '1000',
    //     image: image2
    //   },
    //   {
    //     name: 'Men Black Slim Fit Solid Casual Shirt',
    //     description: 'Black solid casual shirt, has a spread collar, long sleeves, button placket, curved hem, 1 patch pocket, Long Sleeves, Material: 65% cotton 35% linen, Machine Wash',
    //     price: '900',
    //     image: image3
    //   },
    //   {
    //     name: 'Men Yellow Printed Round Neck T-Shirt',
    //     description: 'gym-to-street look, 100% cotton, Machine-wash',
    //     price: '750',
    //     image: image4
    //   },
    //   {
    //     name: 'Men Navy Blue Tapered Fit Mid-Rise Clean Look Stretchable Jeans',
    //     description: 'Navy Blue dark wash 5-pocket mid-rise jeans, clean look, light fade, has a button and zip closure, waistband with belt loops, 98% Cotton 2% Elastane, Machine-wash',
    //     price: '1300',
    //     image: image5
    //   }
    // ]
    // if (this.props.productDetail.length > 0) {
    //   this.props.productDetail.map((obj, i) => {
    //     inventory.push(obj);
    //   })
    // }
    this.state = {
      inventoryProducts: [],
      deletedPrdoucts: []
    }
  }

  componentWillMount = () => {
    fetch('https://5f44abf43fb92f0016753a78.mockapi.io/products',
      {
        method: 'GET'
      })
      .then(async (res) => {
        let response = await res.json();
        console.log("res: ", response)
        this.setState({ inventoryProducts: response })
      })
      .catch((error) => {
      })
  }

  navigateToProductDetail = (product) => {
    fetch(`https://5f44abf43fb92f0016753a78.mockapi.io/products/${product.id}`,
      {
        method: 'GET'
      })
      .then(async (res) => {
        let response = await res.json();
        console.log("res: ", response)
      })
      .catch((error) => {
      })
    this.setState({
      navigate: true,
      product: product
    })
  }

  rows = () => {
    const rowsOutput = this.state.inventoryProducts.map((item, id) => {
      return (
        <tr key={id}>
          {/* <td><input type="radio"></input></td> */}
          <td><div onClick={() => this.navigateToProductDetail(item)}>{id + 1}</div></td>
          <td><img src={item.image} height="100" weight="100" alt="Image Not Available" /></td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>
            <Button variant="danger" onClick={() => { this.handleDelete(id, item) }} ><RiDeleteBin6Line /></Button>
          </td>
        </tr>
      );
    });
    return rowsOutput;
  }

  handleDelete = (id, product) => {
    fetch(`https://5f44abf43fb92f0016753a78.mockapi.io/products/${product.id}`,
      {
        method: 'DELETE'
      })
      .then(async (res) => {
        let response = await res.json();
        console.log("res: ", response)
      })
      .catch((error) => {
      })
    let rowsS = [...this.state.inventoryProducts];
    rowsS.splice(id, 1);
    this.setState({
      inventoryProducts: rowsS
    });
    let del = this.state.deletedPrdoucts;
    del.push(product);
    this.setState({ deletedPrdoucts: del });
    console.log(this.state.deletedPrdoucts)
  }

  deleteRows = () => {
    if (this.state.deletedPrdoucts) {
      const rowsOutput = this.state.deletedPrdoucts.map((item, id) => {
        return (
          <tr key={id} style={{textAlign: 'center'}}>
            {/* <td><input type="radio"></input></td> */}
            <td>{id + 1}</td>
            <td><img src={item.image} height="100" weight="100" alt="Image Not Available" /></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <Button variant="primary" onClick={() => { this.restore(id, item) }} >Restore</Button>
            </td>
          </tr>
        );
      });
      return rowsOutput;
    }
  }

  restore = (id, item) => {
    let rowsS = [...this.state.inventoryProducts];
    rowsS.push(item);
    let del = [...this.state.deletedPrdoucts];
    del.splice(id, 1);
    this.setState({
      inventoryProducts: rowsS,
      deletedPrdoucts: del,
      showModal: false
    });
    fetch('https://5f44abf43fb92f0016753a78.mockapi.io/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      })
      .then((data) => {
        console.log('submit: ', data)
      })
      .catch((error) => {
        console.log('err: ', error)
      })
  }

  restoreAllProducts = () => {
    let productsAvailable = this.state.inventoryProducts;
    this.state.deletedPrdoucts.map((obj, index) => {
      productsAvailable.push(obj);
      fetch('https://5f44abf43fb92f0016753a78.mockapi.io/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then((data) => {
        console.log('submit: ', data)
      })
      .catch((error) => {
        console.log('err: ', error)
      })
    })
    this.setState({
      inventoryProducts: productsAvailable,
      showModal: false,
      deletedPrdoucts: []
    })
  }

  render() {

    if (this.state.navigate) {
      return (<Redirect to={{
        pathname: "/productdetail",
        state: {
          product: this.state.product
        }
      }} />)
    }
    if (this.props.productDetail) {
      this.state.inventoryProducts.push(this.props.productDetail)
    }
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h4 style={{ textAlign: 'left' }}>Inventory Products</h4>
          {
            this.state.deletedPrdoucts.length > 0 &&
            <Button variant='outline-info' style={{ marginLeft: 985 }} onClick={() => this.setState({ showModal: true })}>Recently Deleted</Button>
          }
        </div>
        <Table striped bordered hover style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.rows()}</tbody>
        </Table >
        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.deleteRows()}</tbody>
            </Table >
            <Button variant="primary" onClick={() => this.restoreAllProducts()}>Restore All</Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
