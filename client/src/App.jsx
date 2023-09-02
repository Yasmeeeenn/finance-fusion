import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { useState } from "react"; // Import useState for managing 'display'

import Navbar from "./components/Navbar";
import Bio from "./components/Bio"; // Import Bio (assuming you have components with these names)
import History from "./components/History"; // Import History
import Contact from "./components/Contact"; // Import Contact
import Portfolio from "./components/Portfolio"; // Import Portfolio

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Initialize 'display' state variable
  const [display, setDisplay] = useState("Bio"); // Set the initial value

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Navbar setDisplay={setDisplay} />{" "}
        {/* Pass setDisplay function as a prop */}
        <div className="container">
          <Outlet />
        </div>
        <div>
          {/* Conditional rendering based on 'display' */}
          {display === "login" ? (
            <Bio />
          ) : display === "home" ? (
            <History />
          ) : display === "savedLoans" ? (
            <Contact />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
