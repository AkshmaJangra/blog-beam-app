// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogPage from "./components/Blog";
import CreateBlog from "./components/AddEditBlog";
import "./App.css";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
