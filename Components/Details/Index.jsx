import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Index = ({ meals, int, msr }) => {
  return (
    <div className={styles.main_data}>
      <div className={styles.img_wrapper}>
        {meals?.strMealThumb && (
          <Image
            src={meals.strMealThumb}
            alt={meals.strMeal}
            height="30%"
            width="100%"
            layout="responsive"
            className={styles.img}
          />
        )}
      </div>
      <div className={styles.top}>
        <div>
          <h6>id: {meals.idMeal}</h6>
          <h1>{meals.strMeal}</h1>
        </div>
        <div>
          <p>
            Category: {meals?.strCategory ? meals.strCategory : "Not Specified"}
          </p>
          <p>Area: {meals?.strArea ? meals.strArea : "Not Specified"}</p>
          <p>Tags: {meals.strTags}</p>
        </div>
      </div>
      <div style={{ margin: "2rem" }}>
        <h3 style={{ textAlign: "left", margin: "2rem 5rem" }}>
          Instructions{" "}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            {meals?.strInstructions &&
              meals.strInstructions.split(". ").map((meal) => {
                return (
                  <>
                    <p key={meal}>{meal}</p>
                    <br />
                  </>
                );
              })}
          </p>
        </div>
      </div>
      <div>
        <h3 style={{ textAlign: "left", margin: "2rem 5rem" }}>Ingredients</h3>
        <div className={styles.ints}>
          <div>
            {int?.map((i) => {
              return <p key={i}>{i} - </p>;
            })}
          </div>
          <div>
            {msr?.map((i) => {
              return (
                <p key={i} style={{ margin: "0 3px" }}>
                  {i}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {meals?.strYoutube && (
          <iframe
            width="100%"
            height="315"
            src={meals.strYoutube}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Index;
