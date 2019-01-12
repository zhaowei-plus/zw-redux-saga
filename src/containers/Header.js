import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import './Header.css'

const Header = (props) => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="header-limit">
        <a href="https://cnodejs.org/" className="logo">
          <span className="node-title">学习社区</span>
        </a>

        <div className="container">
          <div className="collapse navbar-collapse" id="menu">
            <ul className="nav navbar-nav">
              <li className="active">
                <a href="/">
                  <span className="menu-text">全部</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="menu-text">精华</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="menu-text">分享</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="menu-text">问答</span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="menu-text">招聘</span>
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/">
                  <span className="menu-text">退出</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Header;