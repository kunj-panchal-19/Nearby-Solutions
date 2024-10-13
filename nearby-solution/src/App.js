import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Map from "./pages/Map";
import ContextAuth from "./context/context";
import Navbar from "./components/Layout/Navbar";
import { toast } from "react-toastify";
import Footer from "./components/Layout/Footer";
import SidebarService from "./components/serviceProvider/SidebarService";
import SidebarCustomer from "./components/customer/SidebarCustomer";
import UpdateLocation from "./components/serviceProvider/updateLocation";
import SearchService from './components/customer/searchService';
import AddService from './components/serviceProvider/addService';
import MapComponent from './components/customer/MapComponent';
import Index from './components/community/index'
import MapMain from './components/customer/MapMain';
import Feedback from './pages/Feedback';
import Showfeedback from './pages/Showfeedback';
import Allservices from './pages/Allservices';
import ScholarshipProvider from './components/context/main';
import themeProvider from './components/context/themeContext';
import Test from './pages/test'

function App() {
  return (
    <>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Tooltip id="my-tooltip" className='h-8 w-auto' style={{ zIndex: 9999 }} />
        <div className="sticky top-0 z-50">
          <Navbar className="z-50"/>
        </div>
        <div className="flex flex-1">
          <SidebarService />
          <div className="w-full mt-5 p-4">
            <ScholarshipProvider>
              <themeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path='/search' element={<SearchService />} />
              <Route path='updateLocation' element={<UpdateLocation />} />
              <Route path="/map" element={<Map />} />
              <Route path="/addService" element={<AddService />} />
              <Route path='/directions' element={<MapMain />} />
              <Route path='/feedback' element={<Feedback />} />
              <Route path='/showfeedback' element={<Showfeedback />} />
              <Route path='/getallservices' element={<Allservices />} />
              <Route path='/community' element={<Index/>}></Route>
              <Route path='/test' element={<Test/>}></Route>
            </Routes>
            </themeProvider>
            </ScholarshipProvider>
          </div>
        </div>
        <Footer className="z-50"/>
      </div>
    </>
  );
}

export default App;
