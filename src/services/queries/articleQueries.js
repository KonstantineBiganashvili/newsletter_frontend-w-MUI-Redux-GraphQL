import { gql } from '@apollo/client';

const GET_ARTICLES = gql`
  query articlesWithLimit($limit: String!, $offset: String!) {
    articlesWithLimit(limit: $limit, offset: $offset) {
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

const GET_FILTERED_ARTICLES = gql`
  query articlesWithLimit($startDate: String!, $endDate: String!) {
    articlesFilterdByDate(startDate: $startDate, endDate: $endDate) {
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

export { GET_ARTICLES, GET_FILTERED_ARTICLES };
