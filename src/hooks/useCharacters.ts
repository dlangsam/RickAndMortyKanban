import { useQuery, gql } from '@apollo/client';
import { Character } from '../types/kanban';

// GraphQL query to fetch Rick and Morty characters
// We're fetching the first 20 characters from page 1
const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

// The shape of the response from the API
interface CharactersResponse {
  characters: {
    results: Character[];
  };
}

// Custom hook that encapsulates the GraphQL fetch logic
// Components can just call this hook and get the characters, loading state, and errors
export function useCharacters() {
  const { data, loading, error } = useQuery<CharactersResponse>(GET_CHARACTERS);

  return {
    characters: data?.characters.results || [],
    loading,
    error,
  };
}
