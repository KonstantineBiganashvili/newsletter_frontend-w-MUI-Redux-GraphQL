import { gql } from '@apollo/client';

const ADD_ARTICLE = gql`
  mutation addArticle(
    $title: String!
    $name: String!
    $surname: String!
    $phone: String!
    $email: String!
    $date: String!
    $categoryId: Int!
    $content: String!
  ) {
    addArticle(
      title: $title
      name: $name
      surname: $surname
      email: $email
      phone: $phone
      date: $date
      content: $content
      categoryId: $categoryId
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

export { ADD_ARTICLE };
