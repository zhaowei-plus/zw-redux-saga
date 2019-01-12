import React from 'react';
import './Carousel.css';

export default class Carousel extends React.Component {
  render() {
    return (
      <div id="ownCarousel" className="carousel slide">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="item active">
            <img src="//upload.jianshu.io/admin_banners/web_images/4603/d2b74e05eff3ede5eff7906f85d60ac2a93b4584.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="540"/>
          </div>
          <div className="item">
            <img src="//upload.jianshu.io/admin_banners/web_images/4592/2f843121ecd03aaf8b10f1adbd92494f6b051112.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="540"/>
          </div>
          <div className="item">
            <img src="//upload.jianshu.io/admin_banners/web_images/4590/7f1edd154f90446a038d6ecd10bebf6e8929fbf5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="540"/>
          </div>
        </div>
      </div>
    );
  }
}