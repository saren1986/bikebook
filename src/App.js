import React from 'react';
import './App.css'
import 'typeface-roboto';
import Layout from './components/Layouts/MainLayout/Layout';
import BikesPanel from './components/BikesPanel/BikesPanel';

const App = () => {
  return (
    <Layout>
      <BikesPanel/>
    </Layout>
  )
}

export default App

