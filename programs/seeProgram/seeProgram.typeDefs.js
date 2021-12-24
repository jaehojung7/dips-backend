import { gql } from "apollo-server";

export default gql`
  type Query {
    seeProgram(id: Int!): Program
  }
`;
