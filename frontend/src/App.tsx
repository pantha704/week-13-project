import { Auth } from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "@/pages/Blogs";
import { BlogPage } from "@/pages/BlogPage";
import { Publish } from "@/pages/Publish";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/signin" element={<Auth type="signin" />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
