import { gql } from '@apollo/client';

const GET_ARTICLES = gql`
  query articlesWithLimit(
    $startDate: String
    $endDate: String
    $limit: String!
    $offset: String!
  ) {
    articlesWithLimit(
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      offset: $offset
    ) {
      id
      title
      name
      surname
      email
      phone
      category {
        id
        name
      }
      date
      content
    }
  }
`;

const GET_ARTICLE_COUNT = gql`
  query articlesCount($startDate: String, $endDate: String) {
    articlesCount(startDate: $startDate, endDate: $endDate)
  }
`;

export { GET_ARTICLES, GET_ARTICLE_COUNT };
