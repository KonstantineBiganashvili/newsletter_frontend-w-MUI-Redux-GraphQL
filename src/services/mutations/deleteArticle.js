import { gql } from '@apollo/client';

const DELETE_ARTICLE = gql`
  mutation removeArticle(
    $id: Int!
    $limit: String!
    $offset: String!
    $startDate: String
    $endDate: String
  ) {
    removeArticle(
      id: $id
      limit: $limit
      offset: $offset
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      title
      name
      surname
      phone
      email
      date
      content
      category {
        id
        name
      }
    }
  }
`;

export { DELETE_ARTICLE };
