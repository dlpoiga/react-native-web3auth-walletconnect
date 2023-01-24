/**
 * @format
 */

import 'react-native';
import React from 'react';
import Touch from '../src/components/common/touch';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Touch renders correctly', () => {
  const tree = renderer.create(<Touch />).toJSON();
  expect(tree).toMatchSnapshot();
});
