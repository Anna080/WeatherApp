# Projet WeatherApp - Guide d'utilisation

Ce projet contient des fichiers volumineux qui ont été déplacés vers Google Drive pour des raisons de limitation de taille de dépôt. Veuillez suivre les instructions ci-dessous pour récupérer ces fichiers et les placer dans les emplacements appropriés pour que le projet fonctionne correctement.

## Prérequis

Avant d'exécuter ce projet, assurez-vous d'avoir les prérequis suivants installés sur votre système :

- VSCode
- Node JS
- React Native
- ElasticSearch

## Étape 1 : Récupération des fichiers volumineux

1. Accédez au [lien suivant](https://drive.google.com/drive/folders/1oYDcgEKTizT9FVvInkkBrI8Uk7s3HXdF?usp=sharing) pour télécharger les fichiers volumineux depuis Google Drive.

2. Téléchargez les fichiers suivants à partir du dossier Google Drive :
   - **forecastdata.zip** : Ce fichier contient les données de prévision au format CSV.
   - **allCountries.txt** : Ce fichier contient des informations sur tous les pays.
   - **countryInfo.txt** : Ce fichier contient des informations détaillées sur chaque pays.

## Étape 2 : Placement des fichiers dans les dossiers appropriés

1. Extrayez le contenu du fichier **forecastdata.zip** téléchargé.

2. Placez les fichiers CSV extraits dans le dossier **forecastdata** à la racine du projet.

3. Déplacez le fichier **allCountries.txt** dans le dossier **ElasticSearch** du projet.

4. Déplacez également le fichier **countryInfo.txt** dans le dossier **ElasticSearch**.

## Étape 3 : Exécution des scripts

Maintenant que vous avez placé les fichiers volumineux dans les emplacements appropriés, vous pouvez exécuter le projet. Assurez-vous d'avoir correctement installé toutes les dépendances requises avant de lancer l'application.

Lancez l'application et elle utilisera automatiquement les données des fichiers placés dans les dossiers spécifiés.

1. Lancez le serveur en exécutant la commande suivante dans le dossier **WeatherAPI** : node server.js

2. Assurez-vous que ElasticSearch est en cours d'exécution.

3. Exécutez le script `conversionJSON.py` qui convertit les données des villes brutes en données utilisables par notre application. Le script se trouve dans le dossier **ElasticSearch**.

4. À la fin de l'exécution de `conversionJSON.py`, exécutez le script `Indexation.py` pour indexer les données sur ElasticSearch. Ce script se trouve également dans le dossier **ElasticSearch**.

## Étape 4 : Exécution de l'application React Native

1. Lancez le projet React Native qui se trouve dans le dossier **WeatherProject** sur un simumateur.

2. Exécutez ensuite votre application React Native sur le simulateur.

Assurez-vous de suivre ces étapes dans l'ordre pour que le projet fonctionne correctement. Si vous rencontrez des problèmes ou des erreurs, référez-vous aux messages d'erreur pour diagnostiquer les problèmes éventuels.

**Remarque :** Assurez-vous de maintenir l'organisation des dossiers telle qu'elle est décrite dans ce guide. Cela garantira que le projet peut accéder aux fichiers nécessaires sans erreur.

**Avertissement :** Les fichiers volumineux ont été déplacés vers Google Drive pour éviter de surcharger le dépôt Git. Veuillez ne pas les ajouter directement au dépôt pour préserver sa taille et sa performance. Suivez les étapes décrites ci-dessus pour utiliser les fichiers dans le projet correctement.

