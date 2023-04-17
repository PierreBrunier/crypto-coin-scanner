
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: any;

  constructor() {

  }  

  ngOnInit() {
    // Sélectionner le bouton hamburger et le menu déroulant
    const menuBtn = document.querySelector('.menu') as HTMLDivElement;
    const menuList = document.querySelector('.menu-list') as HTMLUListElement;
  
    let menuIsOpen = false;
  
    // Vérifier si le bouton hamburger a été trouvé
    if (menuBtn) {
      // Ajouter un écouteur d'événement au clic sur le bouton hamburger
      menuBtn.addEventListener('click', () => {
        // Vérifier si le menu déroulant a été trouvé
        if (menuList) {
          if (!menuIsOpen) {
            // Afficher le menu déroulant
            menuList.style.display = 'block';
            menuIsOpen = true;
            
            // Masquer le menu déroulant après un délai de 8 secondes
            setTimeout(() => {
              menuList.style.display = 'none';
              menuIsOpen = false;
            }, 8000);
          } else {
            // Masquer le menu déroulant
            menuList.style.display = 'none';
            menuIsOpen = false;
          }
        }
      });
    }

    // Ajouter un écouteur d'événement pour le survol des éléments de menu
    //const menuItems = document.querySelectorAll('.menu-item') as NodeListOf<HTMLLIElement>;
    //if (menuItems) {
    //  menuItems.forEach((menuItem) => {
    //    menuItem.addEventListener('mouseover', () => {
    //      menuItem.style.borderBottom = '3px solid orange';
    //    });
    //    menuItem.addEventListener('mouseout', () => {
    //      menuItem.style.borderBottom = 'none';
    //    });
    //  });
    //}
  }

}