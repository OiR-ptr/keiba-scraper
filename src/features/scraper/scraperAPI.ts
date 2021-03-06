import { Adding, HorseProfile, RaceJson, Track } from "./scraperSlice";

type Query = { query: string };

function toGraphQL(query: Query) {
  return fetch(`${process.env.REACT_APP_HASURA_API_URL}`, {
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
      Tracks {
        id
        name
      }
    }`,
  };

  return toGraphQL(query);
}

export function registerRace(adding: Adding, tracks: Track[]) {
  const race = JSON.parse(adding.raceJson) as RaceJson;
  const horses = adding.horsesJson.map(horse => JSON.parse(horse) as HorseProfile);

  const query = {
    query: 
    `mutation MyMutation {
      insert_Races(objects: ${(() => {
        const track = tracks.find(it => it.name === race.raceTrack);

        return JSON.stringify(Object.assign({
          name: race.raceName,
          weather: race.weather,
          baba: race.baba,
          course: race.course,
        }, track ? { 
          track_id: track.id 
        } : {
        },
        {
          Entries: { data: race.horses.map(horse => {
            const profile = horses.find(h => h.name === horse.HorseInfo);

            return Object.assign({
              waku: Number(horse.Waku_Txt_C),
              umaban: Number(horse.Umaban_Txt_C),
              checkmark: horse.CheckMark_Horse_Select,
              barei: horse.Barei_Txt_C,
              handicap: Number(horse.Txt_C),
              jockey: horse.Jockey,
              trainer: horse.Trainer,
              weight: horse.Weight,
              href: horse.href,
            }, profile ? {
              Horse: {
                data: Object.assign({
                  name: profile.name,
                  sire: profile.sire,
                  broodmare_sire: profile.broodmare_sire,
                }, profile.results.length ? {
                  RaceResults: {
                    data: profile.results.map(result => {
                      return {
                        date: result.date,
                        track: result.track,
                        weather: result.weather,
                        round: result.round,
                        raceName: result.raceName,
                        heads: result.heads,
                        waku: result.waku,
                        umaban: result.umaban,
                        popular: result.popular,
                        finish: result.finish,
                        jockey: result.jockey,
                        handicap: result.handicap,
                        course: result.course,
                        baba: result.baba,
                        time: result.time,
                        gap: result.gap,
                        passing: result.passing,
                        pace: result.pace,
                        halon: result.halon,
                        weight: result.weight,
                        winner: result.winner,
                      };
                    }),
                  }
                } : {}),
              },
            } : {
              Horse: {
                data: {
                  name: horse.HorseInfo,
                }
              },
            });
          })}
        }
        )).replace(/"([0-9a-zA-Z_]*)":/g, "$1:");
      })()}) {
        returning {
          id
        }
      }
    }`,
  };

  return toGraphQL(query);
}

export function deleteRaceById(raceId: number) {
  const query = {
    query: 
    `mutation MyMutation {
      delete_RaceResult(where: {Horse: {Entries: {Race: {id: {_eq: ${raceId}}}}}}) {
        affected_rows
      }
      delete_Horses(where: {Entries: {Race: {id: {_eq: ${raceId}}}}}) {
        affected_rows
      }
      delete_Entries(where: {Race: {id: {_eq: ${raceId}}}}) {
        affected_rows
      }
      delete_Races(where: {id: {_eq: ${raceId}}}) {
        affected_rows,
        returning {
          id
        }
      }
    }`,
  };

  return toGraphQL(query);
}

export function fetchRaceById(raceId: number) {
  const query = {
    query: 
    `query MyQuery {
      Races_by_pk(id: ${raceId}) {
        name
        weather
        baba
        course
        Track {
          name
          comment
          turf_comment
        }
        Entries {
          waku
          umaban
          barei
          handicap
          weight
          jockey
          trainer
          href
          Horse {
            name
            sire
            broodmare_sire
            RaceResults {
              date
              raceName
              course
              weather
              baba
              track
              waku
              umaban
              handicap
              weight
              jockey
              finish
              time
              gap
              halon
              winner
              passing
              pace
            }
          }
        }
      }
    }`,
  };

  return toGraphQL(query);
}

export function fetchRecordSameCondition(course: string, raceId: number) {
  const query = {
    query: 
    `query MyQuery {
      RaceResult(where: {course: {_eq: "${course}"}, Horse: {Entries: {Race: {id: {_eq: ${raceId}}}}}}, order_by: {time: asc, finish: asc}) {
        date
        weather
        baba
        track
        raceName
        course
        handicap
        weight
        finish
        waku
        umaban
        jockey
        time
        halon
        winner
        passing
        pace
        Horse {
          name
        }
      }
    }`,
  };

  return toGraphQL(query);
}