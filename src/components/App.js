import React from "react";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";

const App = () => (
  <div className="app">
    <Navigation />
    <Main />
  </div>
);
const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact activeClassName="current" to="/app">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/app/claim">
          Claim
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/app/AboutUs">
          About us
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to="/app/ContactUs">
          Contact Us
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Home = () => (
  <div className="home">
    <img
      width="800"
      src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/43235551_2196410690682238_5096892747348967424_o.jpg?_nc_cat=106&oh=25bda75e21065c505f40a2d4390fb2a0&oe=5C172F81"
    />
  </div>
);

const Claim = () => (
  <div className="claim">
    <p>View your past invoices</p>
    <p>Add past invoices</p>
  </div>
);

const AboutUs = () => (
  <div className="AboutUs">
    <br />
    <br />
    <h4>Ez-Claim, Inc.</h4>
    <p>720 4th Aves S, St Cloud, MN 56301</p>
    <br />
    <h4>Slogan</h4>
    <p>The Pledge of Excellence</p>
    <br />
    <h4>Description</h4>
    <p>
      EZ-Claim, Inc. is a risk management company Tenants/Home owners manage
      their risk issues effectively and ensure the claim process is very smooth
      during thier recovery period.
    </p>
    <br />
    <h4>Mission Statement</h4>
    <p>
      We want to help consumers as well as the insurance providers with claims
      in addition to making the claims process work better for everyone.
    </p>
    <br />
  </div>
);

const ContactUs = () => (
  <div className="ContactUs">
    <h4>Contact us</h4>
    <p>
      email: support@ezclaim.com <br />
      phone: 012-345-6789 <br />
      social media:
    </p>

    <a href="http://www.facebook.com/">
      <img
        class="logo"
        src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
        height="50"
        weidth="50"
        alt="facebook"
      />
    </a>

    <a href="http://www.instagram.com/">
      <img
        class="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMwWGjZ7nlKOYRbvHyEJGCJ_LAbkeGjSMysw6E8ZDiXU9MNyz"
        height="50"
        weidth="50"
        alt="Instagram"
      />
    </a>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/app" component={Home} />
    <Route exact path="/app/claim" component={Claim} />
    <Route exact path="/app/aboutus" component={AboutUs} />
    <Route exact path="/app/contactus" component={ContactUs} />
  </Switch>
);

export default App;
