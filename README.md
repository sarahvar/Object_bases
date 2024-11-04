1) Les bases de l'objet

Créer une classe bureau avec les champs :
- nb prises réseau
- nb prises secteur
- nb prises tél
- nb chaises
- nb tables
- nb personnes
et la méthode :
* int tauxespacedispo()

Créer deux sous-classes bureaudeveloppeur et bureaucommercial
* int tauxespacedispo()

Calculer le taux d'espace disponible selon les formules :

classe générique :
  tauxespacedispo=
    personne-reseau+
    personne-secteur+
    personne-tel+
    personne-chaises+
    personne-table

classe commercial:
  tauxespacedispo=
    personne-reseau+
    personne-secteur+
    personne-2*tel+
    personne-2*chaises+
    personne-table
   
classe developpeur:
  tauxespacedispo=
    personne-3*reseau+
    personne-3*secteur+
    personne-tel+
    personne-1.5*chaises+
    personne-table

Créer une classe société et ajouter 3 bureaux commerciaux et 2 bureaux developpeurs. Leur ajouter prises, tables, téléphones etc. pour que chaque bureau puisse accueillir plusieurs personnes

Faire une boucle d'ajout de personnel (commerciaux ou développeur selon une valeur aléatoire). A chaque itération, afficher le nombre de commerciaux, de développeurs, le taux d'espace dispo de chaque bureau et le taux général de la société en appelant tauxespacedispo().
Stopper quand il n'y a plus d'espace disponible.

