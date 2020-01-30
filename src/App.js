import React from "react";

// import { Provider } from "react-redux";
// import initStore from './store'

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { configure as configureStore } from "store";

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

// const store = configureStore();

function App(props) {
  return (
    <>
      <Navbar />
      <Navbar id="navbar-clone" />
      <Sidebar />
      {props.children}
    </>
  );
}
// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Navbar />
//         <Navbar id="navbar-clone" />
//         <Sidebar />
//         <Switch>
//           <Route path="/register">
//             <RegisterPage />
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <Route path="/services">
//             <ServicesPage />
//           </Route>
//           <Route path="/profile">
//             <ProfilePage />
//           </Route>
//           <Route path="/faq">
//             <FaqPage />
//           </Route>
//           <Route path="/">
//             <HomePage />
//           </Route>
//         </Switch>
//       </Router>
//     </Provider>
//   );
// }

export default App;
