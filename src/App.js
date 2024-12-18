import {Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom';
import React, { Component } from 'react';
import PageNotFound from "./pages/public/PageNotFound";
import HomePage from "./pages/public/HomePage";
import Appendix from "./pages/Appendix";
import Header from './components/Header';
import S3Storage from "./pages/S3Storage";
import OcrVision from "./pages/OCRVision";

class App extends Component {
  render() {
    return (
        <div id='main'>
            <BrowserRouter>
            <Header/>
                <div className='body-div'>
              <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/files/:bucket' element={<Appendix/>}/>
                  <Route path='/s3' element={<S3Storage/>}/>
                  <Route path='/vision' element={<OcrVision/>}/>
                  <Route path="*" element={<PageNotFound/>} />
              </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
  }
}

export default App;
