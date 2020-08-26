import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Inventory from '../src/components/Inventory';
 
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Inventory />, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('renders correctly', () => {
  const h = renderer.create(<Inventory />).toJSON();
  expect(h).toMatchSnapshot();
});
