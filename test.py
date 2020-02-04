import json
import os

listdata = [
	{
		"id": "0",
		"name": "Objet1",
		"img": "www.lien.image1",
		"origin": "",
		"bgColor": "",
		"link": "www.achat.objet1"
	},
	{
		"id": "1",
		"name": "Objet2",
		"img": "www.lien.image2",
		"origin": "",
		"bgColor": "",
		"link": "www.achat.objet2"
	},	
	{
		"id": "2",
		"name": "Objet3",
		"img": "www.lien.image3",
		"origin": "",
		"bgColor": "",
		"link": "www.achat.objet3"
	}
]

print("Type de listdata: ")
print(type(listdata))

for element in listdata:
	if(element["id"] == "1"):
		listdata.remove(element)

with open("listdata.json", "w") as file:
	json.dump(listdata, file, indent=4)