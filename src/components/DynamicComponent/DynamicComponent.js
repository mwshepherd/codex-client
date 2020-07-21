import React, { Component } from 'react';

import Journals from '../Journals/Journals';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';

const components = {
  journals: Journals,
  bookmarks: Bookmarks,
  goals: Goals,
};

class DynamicComponent extends Component {
  //   constructor() {}

  render() {
    console.log('inside dynamic component');
    const SelectedPage = components[this.props.page];
    return <SelectedPage />;
  }
}

export default DynamicComponent;
