import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../recette.service';
import { Recette } from '../recette';
import { Observable } from 'rxjs';  // Importation de Observable
import { ToastController } from '@ionic/angular';  // Importation de ToastController

@Component({
  selector: 'app-ajouter-modifier',
  templateUrl: './ajouter-modifier.page.html',
  styleUrls: ['./ajouter-modifier.page.scss'],
})
export class AjouterModifierPage {
  recette: Recette = new Recette('0', '', '', ''); // Nouvelle recette vide par défaut
  isEditMode: boolean = false;
  recettes$: Observable<Recette[]> | undefined;  // Déclarer le type comme undefined au début

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService,
    private toastController: ToastController  // Injecter ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');  // Récupérer l'ID de la route
    if (id) {
      this.isEditMode = true; // Passer en mode édition si un ID est présent
      this.recettes$ = this.recetteService.getRecettes();  // Récupérer l'Observable des recettes
      this.recettes$.subscribe(recettes => {
        const existingRecette = recettes.find(r => r.id === id);  // Rechercher la recette existante par ID
        if (existingRecette) {
          this.recette = { ...existingRecette };  // Pré-remplir la recette avec les données existantes
        } else {
          console.error('Recette introuvable');
          this.router.navigate(['/recettes']);  // Rediriger vers la liste si la recette n'est pas trouvée
        }
      });
    }
  }

  // Sauvegarder la recette (ajout ou modification)
  async save() {
    try {
      if (this.isEditMode) {
        await this.recetteService.modifierRecette(
          this.recette.id,
          this.recette.nom,
          this.recette.ingredients,
          this.recette.etapes
        );
        await this.showToast('Recette modifiée avec succès');
        this.router.navigate(['/recettes']);  // Rediriger vers la liste des recettes après modification
      } else {
        await this.recetteService.ajouterRecette(
          this.recette.nom,
          this.recette.ingredients,
          this.recette.etapes
        );
        await this.showToast('Recette ajoutée avec succès');
        this.router.navigate(['/recettes']);  // Rediriger vers la liste des recettes après ajout
      }
    } catch (error) {
      console.error('Erreur lors de la modification ou ajout: ', error);
      await this.showToast('Erreur lors de l\'ajout ou modification de la recette', 'danger');
    }
  }

  // Fonction pour annuler et revenir à la liste des recettes
  navigateToRecettes() {
    this.router.navigate(['/recettes']);
  }

  // Fonction pour afficher une notification (toast)
  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Durée de la notification en millisecondes
      color: color,  // Couleur de la notification
    });
    toast.present();
  }
}
