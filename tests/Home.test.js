import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Home from '../src/components/Home';
 
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('renders correctly', () => {
  const h = renderer.create(<Home />).toJSON();
  h.addPrdouctToInventory();
  expect(h).toMatchSnapshot();
});
