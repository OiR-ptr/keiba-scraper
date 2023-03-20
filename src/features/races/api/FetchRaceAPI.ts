import { toGraphQL } from '../../utils/api/GraphQL';

export function fetchRegisteredHolds() {
    const query = {
        query: 
        `query FetchRegisteredDates {
            Hold ( distinct_on: kaisai_date ) {
                kaisai_date
            }
        }`,
    };

    return toGraphQL(query);
}

export function fetchRace() {
    const query = {
        query: 
        `query FetchRace {
        }`,
    };

    return toGraphQL(query);
}
