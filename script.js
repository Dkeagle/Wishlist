function LoadJSON(){
	// Variables
	let xhr = new XMLHttpRequest();
	
	// Code
	/* Ajax Request to load the JSON file */
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				GenerateHTML(xhr.responseText);
			}
		}
	};
	xhr.open("GET", "items.json");
	xhr.send();
}

function RotateElement(tag, min, max){
	// Variables
	/* Generate a random integer between min and max, it can be positive OR negative */
	let deg = Math.floor(Math.random() * 2) ? Math.floor(Math.random() * (max - min + 1) + min) : Math.floor(Math.random() * (max - min + 1) - max);

	// Code
	/* Apply the generated number to an HTML element, as a rotation */
	tag.style.transform = "rotate(" + deg + "deg)";
}

function GenerateHTML(serverResponse){
	// Variables
	let items = JSON.parse(serverResponse);
	let domainRegex = /^(?:https?):\/\/([^/]+)(?:\/.*)$/;
	
	// Code
	for (let i in items) {
		let item = items[i];
		
		/* Create A */
		let a = document.createElement("a");
		a.href = item.link;
		a.target = "_blank";

		/* Create div */
		let div = document.createElement('div');
		div.className = "polaroid";

		/* Create the title attribute */
		let title = item.link.match(domainRegex);
		div.title = title[1];

		/* Create img */
		let img = document.createElement("img");
		img.src = item.img;

		/* Apply background color if needed */
		if(item.hasOwnProperty("bgColor")){
			img.style.backgroundColor = item.bgColor;
		}

		/* Change origin point of image if needed */
		if(item.hasOwnProperty("origin") && ["tl", "tr", "bl", "br", "center"].includes(item.origin)){
			img.className = item.origin;
		}else{
			img.style.objectFit = "scale-down";
		}
		
		/* Create p */
		let p = document.createElement('p');
		p.innerHTML = item.name;
		RotateElement(p, 3, 5);
		RotateElement(a, 0, 3);
		
		/* Append items */
		div.appendChild(img);
		div.appendChild(p);
		a.appendChild(div);
		document.body.appendChild(a);
	}
}

window.addEventListener("load", function(){
	LoadJSON();
});