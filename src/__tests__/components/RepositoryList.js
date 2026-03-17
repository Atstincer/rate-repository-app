import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      //screen.debug();

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      //console.log("typeof repositoryItems", typeof repositoryItems);
      //console.log("repositoryItems.length", repositoryItems.length);
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      //console.log(typeof secondRepositoryItem);

      //first item
      //doesnt work....I dont know why
      //expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");

      //works
      expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/); //name
      expect(firstRepositoryItem).toHaveTextContent(
        /Build forms in React, without the tears/,
      ); // description
      expect(firstRepositoryItem).toHaveTextContent(/TypeScript/); // language
      expect(firstRepositoryItem).toHaveTextContent(/1.6k/); // forks count
      expect(firstRepositoryItem).toHaveTextContent(/21.9k/); // stargazers count
      expect(firstRepositoryItem).toHaveTextContent(/88/); // rating average
      expect(firstRepositoryItem).toHaveTextContent(/3/); // review count

      //second item
      expect(secondRepositoryItem).toHaveTextContent(
        /async-library\/react-async/,
      ); //name
      expect(secondRepositoryItem).toHaveTextContent(
        /Flexible promise-based React data loader/,
      ); // description
      expect(secondRepositoryItem).toHaveTextContent(/JavaScript/); // language
      expect(secondRepositoryItem).toHaveTextContent(/69/); // forks count
      expect(secondRepositoryItem).toHaveTextContent(/1.8k/); // stargazers count
      expect(secondRepositoryItem).toHaveTextContent(/72/); // rating average
      expect(secondRepositoryItem).toHaveTextContent(/3/); // review count
    });
  });
});
