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
import { AuthProvider } from "./context/authContext";
import { PostsProvider } from "./context/postsContext";
import About from "./pages/about";
import Destination from "./pages/destination";

function App() {
  return (
    <div>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/destinations" element={<Destination />} />
                <Route path="/blogs/singlepost" element={<SinglePost />} />
                <Route path="/join" element={<Join />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
