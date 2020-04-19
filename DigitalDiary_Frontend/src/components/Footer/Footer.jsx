import React from "react";
import "../Footer/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="section footer-classic">
      <div class="container">
        <div class="row row-30">
          <div class="col-md-4 col-xl-5">
            <div class="pr-xl-4">
              <p>Gladiators Team</p>
              <p id="copyright">© 2018,All Rights Reserved.</p>
            </div>
          </div>
          <div class="col-md-4">
            <h5>Contacts</h5>
            <dl class="contact">
              <dt>Address:205 Humber College Blvd</dt>
            </dl>
            <dl class="contact">
              <dt>email:</dt>
              <dd>gladiatorsdigitaldiary@gmail.com</dd>
            </dl>
          </div>
          <div class="col-md-4 col-xl-3">
            <h5>Links</h5>
            <ul class="nav-list">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contacts</a>
              </li>
              <li>
                <a href="#">Notes</a>
              </li>
              <li>
                <a href="#">Expenses</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
