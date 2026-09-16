import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ExpenseDetails from "./pages/ExpenseDetails";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>{" "}
        <NavLink to="/expenses">Expenses</NavLink>{" "}
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/:id" element={<ExpenseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
