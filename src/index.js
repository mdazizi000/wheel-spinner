import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider } from 'react-redux'
import store from "./store";
import axios from "axios";
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
axios.interceptors.response.use((res)=>{
    return res
},(error => {
    // if (error.response.status === 401){
    //   alert.fire({
    //     title: 'خارج شده ایید!',
    //     text: "خطایی رخ داده است ،مجددا وارد حساب کاربری خود شوید",
    //     icon: 'error',
    //     showConfirmButton: true,
    //     confirmButtonText: 'رفتن به صفحه ورود',
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       sessionStorage.clear()
    //       window.location.replace('/login')
    //
    //     }
    //
    //   })
    //
    // }
    if (error.response.status === 404){
        alert.fire({
            title: '404',
            text: "صفحه مورد مورد نظر شما یافت نشد!",
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'بازگشت به صفحه نخست',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace('/')
            }

        })

    }
    // if (error.response.status === 422){
    //
    //     alert.fire({
    //         title: 'اطلاعات ناقص!',
    //         text: 'اطلاعات وارد شده ناقص می باشد!',
    //         icon: 'error',
    //         showConfirmButton: true,
    //         confirmButtonText: 'متوجه شدم',
    //         reverseButtons: true
    //     })
    // }
    if (error.response.status === 500){
        alert.fire({
            title: 'خطای سرور!',
            text: "خطایی در سرور رخ داده است ،مجدد امتحان کنید",
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'تازه سازی',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }

        })

    }

    return Promise.reject(error)
}))

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
