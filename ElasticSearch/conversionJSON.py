import csv
import json

# Les indices des colonnes qui nous intéressent
# Selon le fichier readme.txt de GeoNames, les indices sont les suivants :
# nom de la ville = 1, code du pays = 8
indices = [1, 8]

# Dictionnaire de correspondance des codes de pays et des noms de pays
country_codes = {}

# Charger les correspondances des codes de pays et des noms de pays depuis le fichier countryInfo.txt
with open('countryInfo.txt', 'r', encoding='utf-8') as country_file:
    reader = csv.reader(country_file, delimiter='\t')
    for row in reader:
        country_code = row[0]
        country_name = row[4]
        country_codes[country_code] = country_name

# Ouvrir le fichier allCountries.txt et le fichier de sortie JSON
with open('allCountries.txt', 'r', encoding='utf-8') as data_file, open('cities.json', 'w', encoding='utf-8') as json_file:
    # Créer un lecteur CSV pour lire le fichier de données
    reader = csv.reader(data_file, delimiter='\t')

    # Pour chaque ligne du fichier
    for row in reader:
        # Sélectionner les données qui nous intéressent
        data = list(row[i] for i in indices)

        # Remplacer le code du pays par le nom complet du pays
        country_code = data[1]
        if country_code in country_codes:
            data[1] = country_codes[country_code]

        # Créer un dictionnaire avec ces données
        city_dict = {
            'nom': data[0],
            'pays': data[1],
        }

        # Écrire le dictionnaire dans le fichier JSON
        json_file.write(json.dumps(city_dict, ensure_ascii=False))
        json_file.write('\n')  # Les documents Elasticsearch doivent être séparés par des sauts de ligne
