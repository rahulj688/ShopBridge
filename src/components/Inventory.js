import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
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
        this.setState({ 
          inventoryProducts: response
        })
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
    let rows = this.state.inventoryProducts;
    let newInv = [];
    rows.map((obj, index) => {
      if(index !== id) {
        newInv.push(obj)
      }
    })
    this.setState({
      inventoryProducts: newInv
    });
    this.props.update();
    console.log(newInv);
    let del = this.state.deletedPrdoucts;
    del.push(product);
    this.setState({ deletedPrdoucts: del });
    console.log(this.state.deletedPrdoucts)
    fetch('https://5f44abf43fb92f0016753a78.mockapi.io/products/'+product.id,
      {
        method: 'DELETE'
      })
      .then(async (res) => {
        console.log("res: ", res)
      })
      .catch((error) => {
      })
  }

  deleteRows = () => {
    if (this.state.deletedPrdoucts) {
      const rowsOutput = this.state.deletedPrdoucts.map((item, id) => {
        return (
          <tr key={id} style={{textAlign: 'center'}}>
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
    this.props.update();
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
    this.props.update();
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
    if (this.props.productDetail && this.props.updateTable) {
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
            <Modal.Title>Deleted Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover style={{ marginTop: 20, textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Restore</th>
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
