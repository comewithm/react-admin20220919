import React,{useState, useEffect} from 'react';
import {Layout, notification} from 'antd'
import { useSelector, useDispatch } from 'react-redux';

import { Counter } from './features/counter/counter';
import { RootState } from './store';
import { updateLayout } from './features/layout/layoutSlice';

function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const appLayout = useSelector((state: RootState) => state.layout)
  const layoutDispatch = useDispatch()

  return (
    <Layout>
      
    </Layout>
  );
}

export default App;
