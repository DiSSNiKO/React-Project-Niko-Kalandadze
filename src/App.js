import Main from './Main';
import Loading from './Loading';
import React from "react";
import { ApolloClient, InMemmoryCache, ApolloProvider, HttpLink, from, InMemoryCache, gql } from '@apollo/client';
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

const productIds = ['apple-airtag', 'apple-airpods-pro', 'apple-iphone-12-pro',
  'jacket-canada-goosee', 'huarache-x-stussy-le', 'ps-5', 'xbox-series-s', 'apple-imac-2021'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      popUpWindowsClosed: true,
      dataIsFetched: false
    }
    this.dataProgress = 0;
    this.usableData = {};
  }
  setPopUpWindowsClosed(val){
    this.setState({
      popUpWindowsClosed:val
    });
  }
  componentDidMount() {
    const amountOfItems = productIds.length;
    productIds.forEach((itemId) => {
      this.fetchedData = client.query({
        query: gql`
        {
          product(id:"${itemId}"){
            id
            name
            prices {
              amount
              currency {
                label
                symbol
              }
            }
            inStock
            gallery
            description
            category
            brand
            attributes {
              id
              name
              type
              items {
                value
                displayValue
              }
            }
          }
        }`
      }).then(result => {
        this.usableData[`${result.data.product.id}`] = result.data.product;
        this.dataProgress++;
        if (this.dataProgress === amountOfItems) {
          this.setState({
            dataIsFetched: true
          });
        }
      });
    });
  }
  componentDidUpdate(){
    console.log('ratom')
  }
  render() {
    return <ApolloProvider client={client}>
      <div className="App" onClick={(e) => {
        if(this.state.popUpWindowsClosed===false){
          console.log('ogo')
          this.setPopUpWindowsClosed(true);
        }
      }}>
        {!this.state.dataIsFetched && <Loading />}
        {this.state.dataIsFetched && <Main popUpsClosed={this.state.popUpWindowsClosed} setPopUpWindowsClosed={this.setPopUpWindowsClosed.bind(this)} data={Object.entries(this.usableData)} />}
      </div>
    </ApolloProvider>
  }
}

export default App;
