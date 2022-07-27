import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { loginUser } from "./store/asyncActions/auth";

import { users } from "./usersDB";

import Home from "./pages/Home/Home";
import Todos from "./pages/Todos/Todos";
import Login from "./pages/Login/Login";
import Navbar from "./layout/Navbar";
import Header from "./components/Header/Header";
import Spinner from "./layout/Spinner";

import ViewTodo from "./pages/ViewTodo/ViewTodo";

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);

  // Auto login from token

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = users.find((el) => el.id === +token);
      if (user) dispatch(loginUser(user.name));
    }
  }, [dispatch]);

  return authState.isLoading ? (
    <Spinner />
  ) : (
    <>
      <Navbar />
      <main>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="todos" element={<Todos />}>
            <Route path=":todoId" element={<ViewTodo />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
