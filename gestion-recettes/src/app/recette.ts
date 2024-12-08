export class Recette {
  id: string;  
  nom: string;
  ingredients: string;
  etapes: string;

  constructor(id: string, nom: string, ingredients: string, etapes: string) {
    this.id = id;
    this.nom = nom;
    this.ingredients = ingredients;
    this.etapes = etapes;
  }
}
