import { Resolvers } from "../__generated__/resolvers-types";
import { faker } from '@faker-js/faker'

export const Query: Resolvers = {
  Query: {
    //@ts-ignore
    user() {
      return {
        id: faker.datatype.uuid(),
      };
    },
  },
};
