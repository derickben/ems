import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import {Employee} from "./pages/Employee.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        employees: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/employees/:id",
    element: <Employee />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ApolloProvider client={client}>
      <RouterProvider router={router}/>
     </ApolloProvider>
    
  </React.StrictMode>,
)
