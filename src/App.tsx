import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';
import { KanbanProvider } from './context/KanbanContext';
import { KanbanBoard } from './components/KanbanBoard';

function App() {
  return (
    // ApolloProvider enables GraphQL queries throughout the app
    <ApolloProvider client={apolloClient}>
      {/* KanbanProvider gives all components access to shared state */}
      <KanbanProvider>
        <KanbanBoard />
      </KanbanProvider>
    </ApolloProvider>
  );
}

export default App;
