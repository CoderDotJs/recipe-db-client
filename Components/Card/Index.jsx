import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Index = ({ meal }) => {
  return (
    <Link href={`/${meal.idMeal}`}>
      <div
        key={meal.idMeal}
        style={{ cursor: "pointer" }}
        className={styles.card}
      >
        {meal?.strMealThumb && (
          <Image
            src={meal?.strMealThumb}
            alt={meal.strMeal}
            width="100%"
            height="100%"
            layout="responsive"
            className={styles.img_rouded}
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
        )}
        <h3>
          {meal.strMeal?.length > 20 ? meal.strMeal.slice(0, 20) : meal.strMeal}
        </h3>
      </div>
    </Link>
  );
};

export default Index;
