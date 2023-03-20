type Query = {
    query: string,
};

export function toGraphQL(query: Query) {
    return fetch(`${process.env.REACT_APP_HASURA_API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': `${process.env.REACT_APP_HASURA_API_KEY}`,
        },
        body: JSON.stringify(query)
    });
};
