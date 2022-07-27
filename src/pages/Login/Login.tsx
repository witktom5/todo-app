import React from "react";
import Spinner from "../../layout/Spinner";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/asyncActions/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

function Login() {
  const [login, setLogin] = useState("");

  const authState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user already logged in
    localStorage.getItem("token") && navigate("/todos");
  }, [authState.isLoading, navigate]);

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(login));
  };
  return authState.isLoading ? (
    <Spinner />
  ) : (
    <>
      {authState.error && <p className={styles.error}>{authState.error}</p>}
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder='Login with "admin" or "user"'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <button className={styles.btn} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
