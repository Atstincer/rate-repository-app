import { gql } from "@apollo/client";

const REPOSIKTORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    text
    createdAt
    rating
    user {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFragment
        }
      }
    }
  }
  ${REPOSIKTORY_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      reviews {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }
  ${REPOSIKTORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }
  ${REVIEW_FRAGMENT}
`;
