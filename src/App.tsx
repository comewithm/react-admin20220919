import React,{useState, useEffect} from 'react';
import {Layout, notification} from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames'

import { Counter } from './features/counter/counter';
import { RootState } from './store';
import { updateLayout } from './features/layout/layoutSlice';
import SiderCustom from './components/SiderCustom';
import { 
  ThemePicker, 
  HeaderCustom,
  Copyright 
} from './components/widget';

import {CRouter as Routes} from './routes'

const {Content, Footer} = Layout

function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const appLayout = useSelector((state: RootState) => state.layout)
  const layoutDispatch = useDispatch()

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const getAppLayout = () => classNames('app_layout', {
    'app_layout-mobile': appLayout.responsive.isMobile
  })

  return (
    <Layout>
      {
        (!appLayout.responsive.isMobile) &&
        <SiderCustom collapsed={collapsed} /> 
      }
      <ThemePicker />

      <Layout
        className={getAppLayout()}
      >
        <HeaderCustom 
          toggle={toggle}
          collapsed={collapsed}
          user={appLayout.auth || {}}
        />
        <Content className='app_layout_content'>
          <Routes auth={appLayout.auth} />
        </Content>
        <Footer className='app_layout_foot'>
          <Copyright />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
