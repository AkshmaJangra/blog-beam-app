import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../FireBaseConfig";
import { useDispatch } from "react-redux";
import { setCurrentUser, clearCurrentUser } from "../slices/authSlice";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(clearCurrentUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const toggleAuthForm = () => {
    setIsSignup((prev) => !prev);
  };

  const handleAuthAction = async (event) => {
    event.preventDefault();

    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setError(null);
        alert("Sign Up successful!");
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setError(null);
        alert("Login successful!");
      } catch (err) {
        setError(err.message);
        // SHOW_ERROR_NOTIFICATION(err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setError(null);
      alert("Logged out successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);
  const handleProtectedNavigation = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      alert("Please log in to create a blog");
    } else {
      setError(null);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 bg-black ">
        <h1 style={{ color: "white" }}>BlogBeam</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ justifyContent: "flex-end" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white active-link"
                    : "nav-link text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white active-link"
                    : "nav-link text-white"
                }
                onClick={handleProtectedNavigation}
              >
                Create Blog
              </NavLink>
            </li>

            <li className="nav-item">
              {isAuthenticated ? (
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <div className="d-flex">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => {
                      setShowModal(true);
                      setIsSignup(false);
                    }}
                  >
                    Login
                  </button>
                  <div className="text-white mt-2">/</div>
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => {
                      setShowModal(true);
                      setIsSignup(true);
                    }}
                  >
                    Signup
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title ">
                  {isSignup ? "Sign Up" : "Login"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="">
                  <form onSubmit={handleAuthAction}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <div class="input-box">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <i class="bx bxs-user"></i>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div class="input-box">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {isSignup && (
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <div class="input-box">
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn bg-black text-white w-100"
                      style={{ borderRadius: "33px", height: "50px" }}
                    >
                      {isSignup ? "Sign Up" : "Login"}
                    </button>
                  </form>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
              <div className="d-flex justify-content-end p-2 mb-1">
                <div onClick={toggleAuthForm}>
                  {isSignup ? (
                    <>
                      Already have an account?
                      <span className="underline-text px-1">Login here</span>
                    </>
                  ) : (
                    <>
                      New user?
                      <span className="underline-text px-1">Register here</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
