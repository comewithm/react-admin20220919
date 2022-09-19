import React,{useState, useEffect} from 'react';
import {Layout, notification} from 'antd'

import { Counter } from './features/counter/counter';

function App() {

  return (
    <Layout>
      <Counter />
    </Layout>
  );
}

export default App;
