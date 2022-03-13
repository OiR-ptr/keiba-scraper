type Query = { query: string };

function toGraphQL(query: Query) {
  return fetch('https://vocal-bug-76.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': `${process.env.REACT_APP_HASURA_API_KEY}`,
    },
    body: JSON.stringify(query)
  });
}

export function fetchRace() {
  const query = {
    query: 
    `query MyQuery {
      Races {
        id
        name
        course
        weather
        baba
        Track {
          name
          turf_comment
          comment
        }
      }
    }`,
  };

  return toGraphQL(query);
}

export function registerRace() {
  const query = {
    query: 
    ``,
  };

  return toGraphQL(query);
}