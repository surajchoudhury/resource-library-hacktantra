import React from "react";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

////
import SidebarUrls from "../components/SidebarUrls";
import UrlsMain from "../components/UrlsMain";
import Loader from "../components/Loader";
import { fetchUrls } from "../Actions";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link as AncLink } from "react-router-dom";

class Urls extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.dispatch(fetchUrls());
  }
  
  renderTooltip = props => {
    return <Tooltip {...props}>Add Quick Links</Tooltip>;
  };

  render() {
    let { urls, isMentor } = this.props;
    return (
      <>
        {urls && urls.success ? (
          <div className="wrapper d-flex align-items-stretch">
            <article className="urls_container">
              <article className="article_content">
                <div id="content">
                  {urls.url.map(url => (
                    <UrlsMain isMentor={isMentor} {...url} />
                  ))}
                </div>
              </article>

              {/* sidebR */}

              <section className="urls_sidebar">
                <nav id="sidebar">
                  <section className="sidebar_contents">
                    <span className="logo_urls">
                      {this.props.isMentor ? (
                        <AncLink to="/create" className="link">
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip}
                          >
                            <AiOutlinePlusCircle className="add_module" />
                          </OverlayTrigger>
                        </AncLink>
                      ) : null}
                      <span className="Links_text">Quick Links</span>
                      <span className="link">
                        <AiOutlinePlusCircle className="add_module_non" />
                      </span>
                    </span>
                    {urls.url.map(url => (
                      <SidebarUrls isMentor={isMentor} {...url} />
                    ))}
                  </section>
                </nav>
              </section>
            </article>
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
