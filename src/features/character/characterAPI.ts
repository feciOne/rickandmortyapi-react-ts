import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export function fetchCharacters(pageId: number) {
  return axios.get(`${baseURL}/character/?page=${pageId}`);
}

export function fetchCharacter(id: number) {
  return axios.get(`${baseURL}/character/${id}`);
}

export function fetchEpisodes(ids: string) {
  return axios.get(`${baseURL}/episode/${ids}`);
}
