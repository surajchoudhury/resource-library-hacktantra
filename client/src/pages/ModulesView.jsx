import React from "react";


class ModulesView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <main>
        <div className="main_container flex">
          <div className="topic-container">
            <div className="topic_header_container">
              <div className="topic_title">Monk visits codeland</div>
              <div>
                <span className="short_decreption">
                  <b>decreption:</b>
                </span>
                <p className="short_decreption">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Reiciendis, quo! Lorem ipsum dolor sit, amet consectetur
                  adipisicing Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Rerum, in.
                </p>
              </div>
              <div className="author_publishDate_container">
                <span className="topic_author_name">
                  {" "}
                  <b>author</b> : reettik
                </span>
                <span className="topic_author_name">
                  <b>publish date</b> : 12/10/2019
                </span>
              </div>
            </div>
            <div className="tutorial_nav">
              <span className="nav-topic underline">Editorial</span>
              <span className="nav-topic">faq</span>
            </div>
            <div className="main_tutorial_area">
              <h2 className="sec_1">sec 1</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                placeat quaerat laudantium magni nihil quibusdam labore eius
                cumque rerum dolore, et qui odio assumenda. Aspernatur sapiente
                similique ex perspiciatis vitae?Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Ad repellendus perspiciatis
                voluptatum atque recusandae, enim laboriosam soluta autem illum
                deleniti ex nobis tempore eos nihil distinctio aspernatur. Et,
                accusantium. Sequi alias amet veniam reiciendis, accusamus
                tempora explicabo esse sunt id rerum porro, deleniti,
                perspiciatis nihil voluptas ex doloremque dolorum ratione.
                Consequatur consectetur libero fugit ad, at optio recusandae
                aspernatur corporis laborum mollitia eius vero suscipit, dolores
                deserunt id soluta dolorum eaque impedit facilis nisi! Rerum,
                vitae voluptatem. Harum, explicabo. Nesciunt dignissimos
                architecto dolore officiis ullam cum quasi voluptatibus natus
                excepturi impedit? Nesciunt earum dicta porro magnam minus
                placeat, odit voluptates.
              </p>
              <h2 className="sec_1">sec 2</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis accusamus minus ducimus fugiat ab, iure autem commodi.
                Fugiat culpa doloremque cupiditate qui quam officiis fuga aut
                alias et voluptatibus illum inventore, iste incidunt cum
                perspiciatis impedit consequuntur magnam ducimus illo!
              </p>
            </div>
            <hr />
            <div className="faq_section">
              <h3 className="faq_heading">Faqs</h3>
              <div className="faq_container">
                <h4 className="question">
                  <span>1.</span> Do I need to pay any money to register for the
                  Hackathon
                </h4>
                <h4 className="answer">
                  <span>&#8618</span> No. You do not have to pay anything to
                  anyone to register yourself for any Hackathon on HackerEarth.
                </h4>
              </div>
              <div className="faq_container">
                <h4 className="question">
                  <span>1.</span> Do I need to pay any money to register for the
                  Hackathon
                </h4>
                <h4 className="answer">
                  <span>&#8618</span> No. You do not have to pay anything to
                  anyone to register yourself for any Hackathon on HackerEarth.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ModulesView;
