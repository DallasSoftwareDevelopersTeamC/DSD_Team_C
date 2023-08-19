import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { createUser, loginUser } from "../../services/userAPIcalls";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSignIn } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [userAddedPrompt, setUserAddedPrompt] = useState("");
  const [userLoginErrorPrompt, setUserLoginErrorPrompt] = useState("");
  const [userAddedErrorPrompt, setUserAddedErrorPrompt] = useState("");

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (login) {
      const userData = await loginUser(
        data.get("username"),
        data.get("password")
      );
      if (userData.user) {
        console.log("logged in");
        authContext.toggleLogin();
        return navigate("/");
      } else {
        setUserLoginErrorPrompt(userData.message);
        setLoading(false);
        return setPrompt(true);
      }
    } else {
      const userData = await createUser(
        data.get("username"),
        data.get("password")
      );
      if (userData.username) {
        const loginData = await loginUser(
          data.get("username"),
          data.get("password")
        );
        if (loginData.user) {
          console.log("signed up and logged in");
          authContext.toggleLogin();
          return navigate("/");
        } else {
          setUserLoginErrorPrompt(loginData.message);
        }
      } else {
        console.log(userData);
        setUserAddedErrorPrompt(userData.message);
      }
      setLoading(false);
      return setPrompt(true);
    }
  };

  const goBack = async () => {
    setLoading(true);
    setUserAddedPrompt("");
    setUserAddedErrorPrompt(false);
    setUserLoginErrorPrompt(false);
    setPrompt(false);
    setLoading(false);
    setLogin(true);
  };

  return (
    <div className="bg-zinc-100 text-zinc-800 p-16 flex flex-col gap-4 rounded-3xl drop-shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold tracking-tighter">Orderly</h1>
        <h3 className="text-xl font-light">
          Inventory Tracking and Automation
        </h3>
      </div>
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        {prompt ? (
          <>
            {userAddedPrompt && (
              <div className="prompt">
                <p style={{ textAlign: "center" }}>
                  Thank you {userAddedPrompt} for signing up! Please sign in.
                </p>
                <button
                  className="btn"
                  id="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </button>
              </div>
            )}
            {userLoginErrorPrompt && (
              <div className="">
                <p>{userLoginErrorPrompt}</p>
                <button
                  className="btn"
                  id="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </button>
              </div>
            )}
            {userAddedErrorPrompt && (
              <div className="">
                <p>{userAddedErrorPrompt}</p>
                <button
                  className="btn"
                  id="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div
                className="circle-spinner"
                style={{ color: "#3b9893" }}
              ></div>
            ) : (
              <>
                <p className="">{login ? "Login" : "Sign Up"}</p>
                <input
                  className="bg-zinc-50 border border-zinc-300 rounded-lg h-12 px-4 text-zinc-800 text-lg outline-emerald-400"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  autoComplete="username"
                  autoFocus
                />
                <input
                  className="bg-zinc-50 border border-zinc-300 rounded-lg h-12 px-4 text-zinc-800 text-lg outline-emerald-400"
                  type={login ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  className="bg-emerald-500/70 rounded-lg h-10 font-bold text-emerald-800"
                  type="submit"
                  id="submit-button"
                >
                  {login ? (
                    <>
                      <FontAwesomeIcon icon={faSignIn} />
                      <span className="ml-2">Sign In</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span className="ml-2">Submit</span>
                    </>
                  )}
                </button>
                <div className="flex justify-center">
                  <p
                    className="hover:cursor-pointer mt-3"
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    {login
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
}
