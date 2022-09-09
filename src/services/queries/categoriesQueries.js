import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export { GET_CATEGORIES };
