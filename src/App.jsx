import React, { useState, useEffect } from 'react';
import Home from './templates/Home';
import About from './templates/About';
import Items from './templates/Items';
import Login from './templates/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './templates/Dashboard';
import Add from './templates/Add';
import ItemsAdd from './templates/ItemsAdd';
import BillingPage from './templates/BillingPage';
import Billing from './templates/BillsListPage';
import BillsListPage from './templates/BillsListPage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


// 🔹 Wrapper component to use useLocation
const Layout = ({ user, setUser }) => {
  const location = useLocation();

  // ✅ Hide header/footer on billing page
  const hideLayout = location.pathname === "/billing";

  return (
    <>
      {!hideLayout && <Header user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/add" element={<Add />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/itemsadd" element={<ItemsAdd />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/list" element={<Billing />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Layout user={user} setUser={setUser} />
    </Router>
  );
};

export default App;