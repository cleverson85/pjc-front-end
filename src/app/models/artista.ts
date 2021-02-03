import { Album } from "./album";
import { Imagem } from "./imagem";

export interface Artista {
  id: number;
  nome: string;
  albuns: Album[];
  imagens: Imagem[];
}
