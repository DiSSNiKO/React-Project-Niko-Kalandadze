import Main from './Main';
import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, from, InMemoryCache, gql } from '@apollo/client';
import { ErrorLink, onError } from '@apollo/client/link/error';


const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    alert('graphql error');
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      popUpWindowsClosed: true,
      dataIsFetched: false,
      productsFetched: false
    }
  }
  setPopUpWindowsClosed(val) {
    this.setState({
      popUpWindowsClosed: val
    });
  }

  render() {
    return <ApolloProvider client={client}>
      <div className="App" onClick={(e) => {
        const etarget = e.target;
        if (!etarget.classList.contains("cart-overlay-part")) {
          if (this.state.popUpWindowsClosed === false) {
            this.setPopUpWindowsClosed(true);
          }
        }
      }}>
        <Main gql={gql} client={client} popUpsClosed={this.state.popUpWindowsClosed} setPopUpWindowsClosed={this.setPopUpWindowsClosed.bind(this)} />
      </div>
    </ApolloProvider>
  }
}

export default App;
