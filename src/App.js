import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/authContext";
import { PostsProvider } from "./context/postsContext";
import { CommentsProvider } from "./context/commentsContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/home"));
const Blogs = lazy(() => import("./pages/blogs"));
const Join = lazy(() => import("./pages/join"));
const Contact = lazy(() => import("./pages/contact"));
const SinglePost = lazy(() => import("./pages/singlepost"));
const About = lazy(() => import("./pages/about"));
const BlogManagement = lazy(() => import("./pages/blogManagement"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <CommentsProvider>
              <BrowserRouter>
              <Navbar />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/singlepost/:id" element={<SinglePost />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route 
                    path="/manage-blogs" 
                    element={
                      <ProtectedRoute>
                        <BlogManagement />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
              <Footer />
              </BrowserRouter>
            </CommentsProvider>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
