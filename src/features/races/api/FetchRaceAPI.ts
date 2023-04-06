import { toGraphQL } from '../../utils/api/GraphQL';

export interface FetchRegisteredDateResponse {
    data: {
        Hold: [
            {
                kaisai_date: string,
            }
        ],
    }
}

export function fetchRegisteredHolds() {
    const query = {
        query: 
        `query FetchRegisteredDates {
            Hold ( distinct_on: kaisai_date, order_by: { kaisai_date: desc } ) {
                kaisai_date
            }
        }`,
    };

    return toGraphQL(query);
}

export interface FetchRaceResponse {
    data: {
        
    }
}

export function fetchRace() {
    const query = {
        query: 
        `query FetchRace {
        }`,
    };

    return toGraphQL(query);
}
