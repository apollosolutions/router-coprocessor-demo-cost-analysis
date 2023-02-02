source .env
rover subgraph publish ${APOLLO_GRAPH_REF} \
  --schema ./subgraph/schema.graphql \
  --name only-subgraph \
  --routing-url http://only-subgraph:4001/graphql