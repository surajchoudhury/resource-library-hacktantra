import React from "react";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

////
import SidebarUrls from "../components/SidebarUrls";
import UrlsMain from "../components/UrlsMain";
import Loader from "../components/Loader";
import { fetchUrls } from "../Actions";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Link as AncLink } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";

class Urls extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchUrls());
  }

  renderTooltip = props => {
    return <Tooltip {...props}>Add Quick Links</Tooltip>;
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  handleCheck = () => {
    this.setState({ checked: false });
  };

  render() {
    let { urls, isMentor } = this.props;
    return (
      <>
        {urls && urls.success ? (
          <div className="wrapper d-flex align-items-stretch">
            {/* <article className="urls_container"> */}
            <article className="article_content">
              <div id="content">
                {urls.url.map(url => (
                  <UrlsMain isMentor={isMentor} {...url} />
                ))}
              </div>
            </article>
            {/* sidebR */}
            <input
              type="checkbox"
              id="side_chk_url"
              checked={this.state.checked}
            />

            <section className="urls_sidebar">
              <nav id="sidebar">
                <section className="sidebar_contents">
                  <label
                    htmlFor="side_chk"
                    className="fold"
                    onClick={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                  >
                    <FiMenu />
                  </label>
                  <span className="logo_urls">
                    {this.props.isMentor ? (
                      <AncLink to="/urls/create" className="link">
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={this.renderTooltip}
                        >
                          <AiOutlinePlusCircle className="add_module" />
                        </OverlayTrigger>
                      </AncLink>
                    ) : null}
                    <span
                      className="Links_text"
                      onClick={() => {
                        this.setState({ checked: false });
                        this.scrollToTop();
                      }}
                    >
                      Quick Links
                    </span>
                    <span className="link">
                      <AiOutlinePlusCircle className="add_module_non" />
                    </span>
                  </span>
                  {urls.url.map(url => (
                    <SidebarUrls
                      handleCheck={this.handleCheck}
                      isMentor={isMentor}
                      {...url}
                    />
                  ))}
                </section>
              </nav>
            </section>
            {/* </article> */}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateToProps({ urls: { urls } }) {
  return {
    urls
  };
}

export default connect(mapStateToProps)(Urls);
