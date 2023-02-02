# Router External Extensibility Example for GraphQL Cost Analysis

An example leveraging the new [experimental extensibility feature](https://www.apollographql.com/docs/router/configuration/external) within the Apollo Router as a means to run cost analysis for incoming queries. 

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Installation

You will need:

* An installation of Docker and the ability to run shell/bash scripts. 
* A new Apollo Studio graph and key, which can be obtained on the initial graph creation page

## Usage

To use this example, first copy the `.env sample` file to `.env` and fill out the required fields. Next, run:

```sh
./schema.sh
```

Once finished, you can then run:

```sh
docker compose up
```

Once the images have been built, you'll see three services stood up: 

* Router - the router instance, hosted on port 4000
* Sidecar - the sidecar application, responsible for validating the request
* Only-subgraph - the subgraph used for testing

Visit http://localhost:4000/ and make a few requests. Requests like:

```graphql
query Friends {
  user {
    id
    friends {
      friends {
        friends {
          friends {
            friends {
              id
            }
          }
        }
      }
    }
  }
}
```

Will fail as the example will determine that the friends field will cost per newly retrieved object. In this case, each `friend` will cost an additional point per retrieval. Once that value reaches above 100 points, the request is denied with a 429 status code. 

In order to maintain performance, there's a local cache in memory using a Map, although this could be improved to use a Redis cache for distributed loads. 

## Known Limitations

List any limitations of the project here:

- The implementation is basic, and all evaluators will be additive; that is, the directive will be in addition to the type-based costs as well. 

## Notes

This is an example of the experimental feature and should be treated as such. 