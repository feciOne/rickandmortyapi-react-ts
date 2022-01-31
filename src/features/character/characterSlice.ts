import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCharacters, fetchCharacter, fetchEpisodes } from './characterAPI';

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface LinkItem {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LinkItem;
  location: LinkItem;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}

export interface CharacterList {
  info: Info;
  results: Character[];
}

export interface SelectedCharacter {
  info: Character;
  episodes: string[];
}

export interface CharacterState {
  selected: SelectedCharacter;
  list: CharacterList | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CharacterState = {
  selected: {} as SelectedCharacter,
  list: null,
  status: 'idle',
};

export const getCharactersAsync = createAsyncThunk(
  'character/fetchCharacters',
  async (page?: number) => {
    page = page ? page : 1;
    const response = await fetchCharacters(page);

    return response.data;
  }
);

export const getCharacterAsync = createAsyncThunk(
  'character/fetchCharacter',
  async (id: number) => {
    const response = await fetchCharacter(id);

    return response.data;
  }
);

export const getEpisodesAsync = createAsyncThunk(
  'character/fetchEpisodes',
  async (ids: string) => {
    const response = await fetchEpisodes(ids);

    if (response.data.length) {
      return response.data.map((episode: Episode) => episode.name);
    } else {
      return [response.data.name];
    }
  }
);

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    increment: (state) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCharactersAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (state.list && action.payload.info.prev) {
          state.list.info = action.payload.info;
          action.payload.results.map((character: Character) => state.list!.results.push(character));
        } else {
          state.list = action.payload;
        }
      })
      .addCase(getCharacterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCharacterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selected!.info = action.payload;
      })
      .addCase(getEpisodesAsync.pending, (state) => {
        state.status = 'loading';
        state.selected!.episodes=[];
      })
      .addCase(getEpisodesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selected!.episodes = action.payload;
      });
  },
});

export const { increment } = characterSlice.actions;

export const characterList = (state: RootState) => state.character.list;
export const selectedCharacter = (state: RootState) => state.character.selected?.info;
export const selectedCharEpisode = (state: RootState) => state.character.selected?.info?.episode;
export const selected = (state: RootState) => state.character.selected;
export const endOfList = (state: RootState) => state.character.list?.info.next ? 0 : 1;

export default characterSlice.reducer;
