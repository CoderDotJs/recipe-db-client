import react, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Loading from "../Components/Loading/Index";
import Header from "../Components/Header/Index";
import Footer from "../Components/Footer/Index";
import Card from "../Components/Card/Index";
import styles from "../styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../utils/toast";
import Image from "next/image";
import { Button } from "react-bootstrap";
import AuthModal from "../Components/AuthModal/Index";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [user, setUser] = useState({});
  const url = "https://www.themealdb.com/api/json/v1/1";
  const [search, setSearch] = useState("Fish");
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getUser = async () => {
      setUserLoading(true);
      try {
        const token = localStorage.getItem("lab_token");
        if (!token) {
          setUser({});
          console.log("no user");
          setUserLoading(false);
        } else {
          const { data } = await axios.get(
            `http://localhost:5000/api/auth/user`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(data);
          setUserLoading(false);
        }
      } catch (error) {
        console.log(error);
        errorToast("Error fetching data");
        setUserLoading(false);
      }
    };

    return () => {
      getUser();
    };
  }, []);

  const getMeals = async (name) => {
    setLoading(true);
    setMeals([]);
    setNotFound(false);
    try {
      const { data } = await axios.get(`${url}/search.php?s=${name}`);
      setMeals(data.meals);
      setLoading(false);
      if (!data.meals || data.meals.length === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.log(error);
      errorToast("Error fetching data");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMeals(search);
  };

  if (userLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Header />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <AuthModal show={show} setShow={setShow} />

      <section className={styles.form}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search By name..."
            required
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            disabled={!user?._id}
            onClick={(e) => handleSubmit(e)}
          />
        </form>
        <span>
          {user?._id
            ? "Your Are loged in"
            : "You need to login to search Recipes"}
          {user?._id ? (
            <button
              style={{
                margin: "0 1rem",
                border: "none",
                background: "transparent",
                color: "#0070f3",
              }}
              onClick={() => {
                localStorage.removeItem("lab_token");
                setUser({});
                successToast("Logout Successful");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              style={{
                margin: "0 1rem",
                border: "none",
                background: "transparent",
                color: "#0070f3",
              }}
              onClick={handleShow}
            >
              Login or Signup
            </button>
          )}
        </span>
      </section>

      <main className={styles.main}>
        {loading && (
          <div>
            <Loading />
          </div>
        )}
        {notFound && !loading && (
          <>
            <div>
              <Image
                src="https://www.supercook.com/statics/images/empty-state-icon.png"
                alt="not found"
                width="140px"
                height="140px"
              />
            </div>
            <h2>No Recipe Found</h2>
          </>
        )}
        <div className={styles.cards}>
          {meals === null ? (
            <div>
              <h2>{!loading && "Search by a Food Name"}</h2>
            </div>
          ) : (
            meals?.map((meal) => {
              return <Card meal={meal} key={meal.idMeal} />;
            })
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}