import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Todos from "./pages/Todos/Todos";
import Navbar from "./layout/Navbar";
import Header from "./components/Header/Header";

import { TodoContextProvider } from "./context/todos";
import ViewTodo from "./pages/ViewTodo/ViewTodo";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Header />
        <TodoContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="todos" element={<Todos />}>
              <Route path=":todoId" element={<ViewTodo />} />
            </Route>
          </Routes>
        </TodoContextProvider>
      </main>
    </Router>
  );
}

export default App;
