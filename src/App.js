import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import NewsList from './components/NewsList';
import AddModal from './components/ModalButton/AddModal';
import Filter from './components/Filter';
import { Box } from '@mui/system';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        categories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Header />
            <Box
              style={{
                marginTop: '100px',
                display: 'flex',
                gap: '30px',
                width: '90vw',
                height: '60px',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              <Filter />
              <AddModal />
            </Box>
            <Routes>
              <Route path="/" element={<NewsList />}></Route>
            </Routes>
          </Router>
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default App;
