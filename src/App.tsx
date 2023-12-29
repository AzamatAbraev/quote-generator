import { BrowserRouter, Route, Routes } from "react-router-dom"

import HomePage from "./pages/home"
import AboutPage from "./pages/about"
import QuotePage from "./pages/quote"
import Header from "./components/Header"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quotes" element={<QuotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
