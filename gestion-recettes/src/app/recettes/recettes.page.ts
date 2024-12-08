import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetteService } from '../recette.service';
import { Recette } from '../recette';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.page.html',
  styleUrls: ['./recettes.page.scss'],
})
export class RecettesPage implements OnInit {
  recettes$: Observable<Recette[]> = new Observable<Recette[]>();
 // Observable pour les recettes
  filteredRecettes: Recette[] = []; // Recettes filtrées pour la recherche
  searchQuery: string = ''; // Champ de recherche

  constructor(
    private recetteService: RecetteService,
    private router: Router
  ) {}

  ngOnInit() {
    // Charger les recettes dès que la page est initialisée
    this.recettes$ = this.recetteService.getRecettes();

    // Abonnement pour mettre à jour la liste des recettes filtrées
    this.recettes$.subscribe((recettes) => {
      this.filteredRecettes = recettes;
    });
  }

  // Fonction pour rechercher les recettes en fonction de la query
  searchRecettes() {
    if (this.searchQuery.trim() === '') {
      this.recettes$.subscribe((recettes) => {
        this.filteredRecettes = recettes; // Si la recherche est vide, afficher toutes les recettes
      });
    } else {
      this.recettes$.subscribe((recettes) => {
        this.filteredRecettes = recettes.filter((recette) =>
          recette.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recette.ingredients.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recette.etapes.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  // Fonction pour rediriger vers la page d'ajout de recette
  addRecette() {
    this.router.navigate(['/ajouter-modifier']); // Redirection vers la page d'ajout/modification
  }

  // Fonction pour modifier une recette
  editRecette(recette: Recette) {
    this.router.navigate(['/ajouter-modifier', { id: recette.id }]); // Redirection vers la page de modification
  }

  // Fonction pour supprimer une recette
  deleteRecette(id: string) {
    this.recetteService.supprimerRecette(id)
      .then(() => console.log('Recette supprimée avec succès!'))
      .catch((error) => console.error('Erreur lors de la suppression: ', error));
  }
}
