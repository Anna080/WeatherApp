from elasticsearch import Elasticsearch, helpers
import json

es = Elasticsearch("http://localhost:9200")

# Load cities from cities.json
cities = []
with open('cities.json', 'r') as f:
    for line in f:
        city = json.loads(line)
        cities.append(city)

# Prepare data for bulk indexing
actions = [
    {
        "_index": "pa_elasticsearch_weather_cities",
        "_id": i,
        "_source": city
    }
    for i, city in enumerate(cities, start=1)
]

# Use the helpers module's bulk function to index the list of actions
response = helpers.bulk(es, actions)

print(f"Indexed {response[0]} documents.")
