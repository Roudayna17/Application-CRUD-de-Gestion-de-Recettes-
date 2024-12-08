import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recette } from './recette';

@Injectable({
  providedIn: 'root',
})
export class RecetteService {
  private collectionName = 'recettes'; // اسم المجموعة في Firestore

  constructor(private firestore: Firestore) {}

  // Méthode pour obtenir la liste des recettes depuis Firestore
  getRecettes(): Observable<Recette[]> {
    const recettesCollection = collection(this.firestore, this.collectionName);
    return collectionData(recettesCollection, { idField: 'id' }) as Observable<Recette[]>;
  }

  // Méthode pour ajouter une nouvelle recette dans Firestore
  ajouterRecette(nom: string, ingredients: string, etapes: string): Promise<void> {
    const recettesCollection = collection(this.firestore, this.collectionName);
    const recette = {
      nom,
      ingredients,
      etapes,
      createdAt: new Date()
    };
    return addDoc(recettesCollection, recette)
      .then(() => console.log('Recette ajoutée avec succès!'))
      .catch((error) => console.error('Erreur lors de l’ajout: ', error));
  }

  // Méthode pour modifier une recette existante dans Firestore
  modifierRecette(id: string, nom: string, ingredients: string, etapes: string): Promise<void> {
    const recetteDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(recetteDoc, { nom, ingredients, etapes })
      .then(() => console.log('Recette modifiée avec succès!'))
      .catch((error) => console.error('Erreur lors de la modification: ', error));
  }

  // Méthode pour supprimer une recette de Firestore
  supprimerRecette(id: string): Promise<void> {
    const recetteDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(recetteDoc)
      .then(() => console.log('Recette supprimée avec succès!'))
      .catch((error) => console.error('Erreur lors de la suppression: ', error));
  }
}
