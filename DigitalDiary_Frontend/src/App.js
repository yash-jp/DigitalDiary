import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

// COMPONENTS
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Login from "./components/Login/login";
import ContactPage from "./pages/contact/contact";
import AddContact from "./components/AddContact/AddContact";
import AddNotes from "./components/AddNotes";
import Signup from "./components/Signup/signup";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes";
import EditNotes from "./components/Notes/editNotes";
import Expense from "./pages/Expense/Expense";
import Categories from "./components/Categories/categories";
import CategoryList from "./pages/category/categoryList";
import EditCategories from "./components/EditCategory/EditCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/addNotes">
            <AddNotes />
          </Route>
          <Route exact path="/editNotes">
            <EditNotes />
          </Route>
          <Route exact path="/editcategories">
            <EditCategories />
          </Route>
          <Route path="/expense" component={Expense} />
          <Route path="/add-contact" component={AddContact}></Route>
          <Route path="/categories-list" component={CategoryList}></Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
