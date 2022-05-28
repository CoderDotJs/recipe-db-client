import React from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Index = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made with{" "}
        <i
          className="fa-solid fa-heart"
          style={{ color: "red", margin: "0 5px" }}
        ></i>{" "}
        <span style={{ margin: "0 5px 0 0" }}>from</span>
        <Image
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/flag-bangladesh_1f1e7-1f1e9.png"
          alt="flag"
          width="20"
          height="20"
        />
      </a>
    </footer>
  );
};

export default Index;
