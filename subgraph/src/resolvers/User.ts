import { Resolvers, UserType } from "../__generated__/resolvers-types";
import { faker } from '@faker-js/faker'

export const User: Resolvers = {
  User: {
    //@ts-ignore
    friends: (_, { first }) => {
      let friends = []
      for (let i = 0; i < first; i++) {
        const f = first
        friends.push({
          id: faker.datatype.uuid(),
          type: Math.floor(Math.random() * 100) % 2 ? UserType.Active : UserType.Inactive,
          status: {
            idT: "1"
          },
        })
      }
      return friends
    },
  },
  Status: {
    __resolveType: () => {
      return Math.floor(Math.random() * 100) % 2 ? 'BanStatus' : 'ValidStatus'
    }
  },
  BanStatus: () => {
    return {}
  }
};
