import { Album } from "./album";


export interface Artista {
  id: number;
  nome: string;
  albuns: Album[];
}
