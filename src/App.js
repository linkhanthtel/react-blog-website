import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Blogs from "./pages/blogs";
import Join from "./pages/join";
import Contact from "./pages/contact";
import SinglePost from "./pages/singlepost";
import Footer from "./components/footer";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <div>
      <ThemeProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/singlepost" element={<SinglePost />} />
          <Route path="/join" element={<Join />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
