import React from "react";

const UrlsMain = props => {
  return (
    <main className="main_container " id={props._id}>
      <p>{props.title}</p>
      <article
        dangerouslySetInnerHTML={{
          __html: props.body
        }}
      ></article>
    </main>
  );
};

export default UrlsMain;
