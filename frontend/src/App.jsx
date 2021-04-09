import React from "react";
import "./App.css";
import axios from "axios";

// const baseUrl = "http://localhost:4000/app/";
const baseUrl = `${process.env.PUBLIC_URL}/app/`;

function App() {
    const [user, updateUser] = React.useState({
        userName: "",
        email: "",
        password: "",
        status: "",
        message: "",
        isRegistered: false,
    });

    function onTextChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        updateUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    function onUserSubmit(event) {
        event.preventDefault();
        const register = {
            password: user.password,
            userName: user.userName,
            email: user.email,
        };
        const url = baseUrl + (user.isRegistered ? "signin" : "signup");
        axios.post(url, register).then((response) => {
            updateUser((prevState) => {
                return {
                    ...prevState,
                    [`message`]: response.data.message,
                    [`status`]: response.data.success,
                };
            });
        });

        updateUser((prevState) => {
            return {
                ...prevState,
                [`password`]: "",
                [`userName`]: "",
                [`email`]: "",
            };
        });
    }

    function changeStatus() {
        updateUser((prevState) => {
            return {
                ...prevState,
                [`password`]: "",
                [`userName`]: "",
                [`email`]: "",
                [`isRegistered`]: !prevState.isRegistered,
            };
        });
    }

    function onMessageChange() {
        updateUser((prevState) => {
            return {
                ...prevState,
                [`message`]: "",
            };
        });
    }

    return (
        <div>
            {user.message.length === 0 && (
                <div class="login-container text-c animated flipInX">
                    <div>
                        <h1 class="logo-badge text-whitesmoke">
                            <span class="fa fa-user-circle"></span>
                        </h1>
                    </div>
                    <h3 class="text-whitesmoke">{user.userName}</h3>
                    <p class="text-whitesmoke">
                        {user.isRegistered ? "Sign In" : "Sign Up"}
                    </p>
                    <div class="container-content">
                        <form class="margin-t" onSubmit={onUserSubmit}>
                            {user.isRegistered === false && (
                                <div class="form-group">
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="Username"
                                        class="form-control"
                                        value={user.userName}
                                        onChange={onTextChange}
                                    ></input>
                                </div>
                            )}
                            <div class="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    class="form-control"
                                    placeholder="E-mail"
                                    value={user.email}
                                    onChange={onTextChange}
                                ></input>
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={onTextChange}
                                ></input>
                            </div>
                            <button
                                type="submit"
                                class="form-button button-l margin-b"
                            >
                                {user.isRegistered ? `Sign In` : `Sign Up`}
                            </button>

                            <p class="text-whitesmoke text-center">
                                <small>
                                    {user.isRegistered
                                        ? `Don't have an account`
                                        : `Have an account`}
                                </small>
                            </p>
                            <a class="text-darkyellow" href="#">
                                <small onClick={changeStatus}>
                                    {user.isRegistered ? `Sign Up` : `Sign In`}
                                </small>
                            </a>
                        </form>
                        <p class="margin-t text-whitesmoke">
                            <small> Harshit © 2021</small>{" "}
                        </p>
                    </div>
                </div>
            )}

            {user.message.length !== 0 && (
                <div className="h-100 p-5 text-white rounded-3">
                    <h1>{user.status === true ? `Awesome!` : `Uh oh!`}</h1>
                    <h5>{user.message}</h5>
                    <button
                        className="btn btn-outline-light"
                        type="button"
                        onClick={onMessageChange}
                    >
                        Go back!
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
