import { useState } from 'react'
import './App.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import EmployeeDirectory from './components/EmployeeDirectory';

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         employees: {
//           merge(existing, incoming) {
//             return incoming;
//           },
//         },
//       },
//     },
//   },
// });

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql",
//   cache
// })

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ApolloProvider client={client}> */}
        <EmployeeDirectory/>
      {/* </ApolloProvider> */}
    </>
  )
}

export default App
