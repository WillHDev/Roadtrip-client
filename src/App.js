import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
// import { Query } from "graphql";

const client = new ApolloClient({
  uri: "https://us1.prisma.sh/will-holcombe-7a9316/database/dev"
});

const POSTS_QUERY = gql`
  query posts {
    posts {
      title
      id
      content
    }
  }
`;

// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Query query={POSTS_QUERY}>
            {({ loading, data }) => {
              if (loading) return "Loading...";
              const { posts } = data;
              return posts.map(post => <h1 key={post.id}>{post.title}</h1>);
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
