# scene-three.js

Afin d'etudier three.js je suis un tuto de Grafikart. Le Panorama 360° 
https://www.youtube.com/watch?v=LbLOXsDVyaM&t=905s


Je distingue par app.js la partie active du code et app-01.js etc les evolutions.
J'ai envie de pouvoir revenir, revoir des détails. Les commentaires seront ainsi des notes a chaque étapes.

    1- app-01: La base de la scene, avec la camera
    2- app-02: ajout d'une image a la texture .
    3- app-03: ajout d'un tolltip .
    4- app-04: responsive de la la scene
    5- app-05: grace a raycaster on peut memoriser la position de la souris et par une fonction ajouter une tooltip.
    6- app-06: apres la methode ajouter une sprite( tooltip) on peut en 4 etapes definir une sprite en un point precis et lui donner un nom
    7- app-07: affichage dans la console du nom de la sprite au click.
    8- app-08: meme chose que le onclick mais avec le survol
    9- app-09: au survol de l'info-bulle un message apparait suivant html et css de tooltip
    10- app-10: ajout d'une animation gsap sur la sprite.
    11- app-11: avant de changer d'image de la scene on applique une opacity:0 avec gsap
    12- app-12: creation d'un class scene qui reprend la methode sphere et addtooltip en cours...
    13- app-13: ajout des sprites tooltip
    14- app-14: on joue une animation sur le click qui applique la methode destroy
    15- app-15: on charge la nouvelle image mais un setTimeout permet l'execution de l'animation gsap