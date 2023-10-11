const collectionNames = ["para-ela", "para-ele", "utilidades"]; // Array de nomes de coleção

export const generateGraphQLQueries = (names: string[]) => {
  const queries: string[] = [];

  for (const name of names) {
    const query = /* GraphQL */ `

        collectionByHandle(handle: "${name}") {
          id
          title
          handle
          image {
            altText
            width
            height
            url
          }

          products(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      
    `;
    queries.push(query);
  }

  const queryQL = /* GraphQL */ `
  
    query {
      ${queries}
    }`;

  return queryQL;
};

export const graphqlQueries = generateGraphQLQueries(collectionNames);

console.log(graphqlQueries);

// Exibir as consultas geradas
// export const searchCollection = graphqlQueries.forEach((query, index) => {
//   console.log(`Consulta ${index + 1}:`);
//   console.log(query);
//   return query;
// });
