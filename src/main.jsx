// libraray import 
import React from 'react'
import ReactDOM from 'react-dom/client'
// component import
import App from './App.jsx'
// css import 
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import {store, persistor }  from './Redux/Slices/store.js'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
    // taking the store from store.js'
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
            {/* toaster component s from toaster component */}
            <Toaster/>  
        </BrowserRouter>
        </PersistGate>
    </Provider>
)
