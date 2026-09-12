import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemon: builder.query({
      async queryFn(_, _queryApi, _extraOptions, baseQuery) {
        const listResult = await baseQuery("pokemon?limit=124");

        if (listResult.error) {
          return { error: listResult.error };
        }

        const detailedResults = await Promise.all(
          listResult.data.results.map(({ name }) => baseQuery(`pokemon/${name}`))
        );
        const failedResult = detailedResults.find((result) => result.error);

        if (failedResult) {
          return { error: failedResult.error };
        }

        return { data: detailedResults.map((result) => result.data) };
      },
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;