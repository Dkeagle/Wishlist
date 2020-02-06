function LoadDB(container, callback){
	// Variables
	let xhr = new XMLHttpRequest();
	
	// Code
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				callback(xhr.responseXML, container);
			}
		}
	};
	xhr.open("GET", "php/getArticles.php");
	xhr.send();
}

function DelArticle(id){
	// Variables
	let xhr = new XMLHttpRequest();
	let list = document.getElementById("list");
	let passwd = document.getElementById("passwordInput").value;
	let errorBox = document.getElementById("errorBox");
	let content="id="+encodeURIComponent(id);
	content += "&passwd="+encodeURIComponent(passwd);
	
	// Code
	/* Clear errorBox */
	errorBox.innerHTML = "";
	/* XHR */
    xhr.onreadystatechange=function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
				if(xhr.responseText !== ""){
					ErrorHandler(xhr.responseText);
				}else{
					list.innerHTML = "";
					LoadDB(list, GenTable);
				}
            }
        }
    };
    xhr.open("POST","php/delArticles.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(content);
}

function ErrorHandler(errorCode){
	// Variables
	let errorBox = document.getElementById("errorBox");
	let passwd = document.getElementById("passwordInput");
	let name = document.getElementById("newName");
	let img = document.getElementById("newImg");
	let bgcolor = document.getElementById("newBgcolor");
	let link = document.getElementById("newLink");
	
	// Code
	switch (errorCode) {
		/* Incorrect password */
		case "P10":
			passwd.style.border = "3px solid #FF0000";
			setTimeout(() => {
				passwd.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "Incorrect password!";
			break;
		/* Empty name */
		case "N10":
			name.style.border = "3px solid #FF0000";
			setTimeout(() => {
				name.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "The new item need a name!";
			break;
		/* Name exceed 50 characters */
		case "N20":
			name.style.border = "3px solid #FF0000";
			setTimeout(() => {
				name.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "The new item name cannot exceed 50 characters!";
			break;
		/* Img is empty */
		case "I10":
			img.style.border = "3px solid #FF0000";
			setTimeout(() => {
				img.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "The new item need an image!";
			break;
		/* Img is not an image */
		case "I20":
			img.style.border = "3px solid #FF0000";
			setTimeout(() => {
				img.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "Unknown image format!";
			break;
		/* Bgcolor is not an hexadecimal color code */
		case "B10":
			bgcolor.style.border = "3px solid #FF0000";
			setTimeout(() => {
				bgcolor.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "Background color must be a correct hexadecimal color code!";
			break;
		/* Link is empty */
		case "L10":
			link.style.border = "3px solid #FF0000";
			setTimeout(() => {
				link.style.border = "none";
			}, 3000);
			errorBox.innerHTML = "The new item need a link!";
			break;
	}
}

function GenPolaroid(serverResponse, container){
	// Variables
	let items = serverResponse.getElementsByTagName('item');

	// Code
	for(let i = 0; i < items.length; i++){
		/* Storing each item attribute in a appropriate var */
		let item = items[i];
		let name = item.getElementsByTagName('name')[0];
		let img = item.getElementsByTagName('img')[0];
		let origin = item.getElementsByTagName('origin')[0];
		let bgcolor = item.getElementsByTagName('bgcolor')[0];
		let link = item.getElementsByTagName('link')[0];
		
		/* Create 'a' tag */
		let aTag = document.createElement("a");
		aTag.href = link.innerHTML;
		aTag.target = "_blank";

		/* Create 'div' tag */
		let divTag = document.createElement("div");
		divTag.className = "polaroid";

		/* Create the 'title' attribute */
		divTag.title = link.innerHTML;

		/* Create 'img' tag */
		let imgTag = document.createElement("img");
		imgTag.src = img.innerHTML;

		/* Change origin point of image if needed */
		if(origin !== undefined && ["tl", "tr", "bl", "br", "center"].includes(origin.innerHTML)){
			imgTag.className = origin.innerHTML;
		}else{
			imgTag.style.objectFit = "scale-down";
		}

		/* Apply background color if needed */
		if(bgcolor !== undefined){
			imgTag.style.backgroundColor = bgcolor.innerHTML;
		}

		/* Create 'p' tag */
		let pTag = document.createElement("p");
		pTag.innerHTML = name.innerHTML;

		/* Rotate things */
		RotateElement(pTag, 3, 5);
		RotateElement(aTag, 0, 3);

		/* Append items */
		divTag.appendChild(imgTag);
		divTag.appendChild(pTag);
		aTag.appendChild(divTag);
		container.appendChild(aTag);
	}
}

function GenTable(serverResponse, container){
	// Variables
	let items = serverResponse.getElementsByTagName('item');
	
	// Code
	/* Generate the table first line */
	GenTableHeader(container);

	/* Create the 'table' tag */
	for(let i = 0; i < items.length; i++){
		/* Storing each item attribute in a appropriate var */
		let item = items[i];
		let id = item.getElementsByTagName('id')[0];
		let name = item.getElementsByTagName('name')[0];
		let img = item.getElementsByTagName('img')[0];
		let origin = item.getElementsByTagName('origin')[0];
		let bgcolor = item.getElementsByTagName('bgcolor')[0];
		let link = item.getElementsByTagName('link')[0];		

		/* Create the 'tr' tag */
		let tr = document.createElement("tr");

		/* Create the 'td' tags */
		let tdId = document.createElement("td");
		let tdName = document.createElement("td");
		let tdImg = document.createElement("td");
		let tdOrigin = document.createElement("td");
		let tdBgcolor = document.createElement("td");
		let tdLink = document.createElement("td");
		let tdDelete = document.createElement("td");

		/* Fill the 'td' tags with informations from the DB */
		tdId.innerHTML = id.innerHTML;
		tdName.innerHTML = name.innerHTML;
		tdImg.innerHTML = img.innerHTML;
		origin !== undefined ? tdOrigin.innerHTML = origin.innerHTML : tdOrigin.innerHTML = "X";
		bgcolor !== undefined ? tdBgcolor.innerHTML = bgcolor.innerHTML : tdBgcolor.innerHTML = "X";
		tdLink.innerHTML = link.innerHTML;
		
		/* Create the delete button for each item */
		let delButton = document.createElement("p");
		delButton.className = "icons";
		delButton.innerHTML = "X";
		delButton.onclick = () => DelArticle(id.innerHTML);
		tdDelete.appendChild(delButton);

		/* Append the 'td' to the 'tr' tag */
		tr.appendChild(tdId);
		tr.appendChild(tdName);
		tr.appendChild(tdImg);
		tr.appendChild(tdOrigin);
		tr.appendChild(tdBgcolor);
		tr.appendChild(tdLink);
		tr.appendChild(tdDelete);

		/* Append the 'tr' tag to the table */
		container.appendChild(tr);
	}
}

function GenTableHeader(container){
	// Code
	/* Create the 'tr' tag */
	tr = document.createElement("tr");
	/* Create the 'th' tags */
	thId = document.createElement("th");
	thName = document.createElement("th");
	thImg = document.createElement("th");
	thOrigin = document.createElement("th");
	thBgcolor = document.createElement("th");
	thLink = document.createElement("th");
	thDelete = document.createElement("th");

	/* Fill them */
	thId.innerHTML = "ID";
	thName.innerHTML = "Name";
	thImg.innerHTML = "Img";
	thOrigin.innerHTML = "Origin";
	thBgcolor.innerHTML = "Background Color";
	thLink.innerHTML = "Link";
	thDelete.innerHTML = "Delete ?";

	/* Append everything */
	tr.appendChild(thId);
	tr.appendChild(thName);
	tr.appendChild(thImg);
	tr.appendChild(thOrigin);
	tr.appendChild(thBgcolor);
	tr.appendChild(thLink);
	tr.appendChild(thDelete);
	container.appendChild(tr)
}

function CheckItem(callback){
	// Variables
	let newName = document.getElementById("newName").value;
	let newImg = document.getElementById("newImg").value;
	let newOrigin = document.getElementById("newOrigin").value;
	let newBgcolor = document.getElementById("newBgcolor").value;
	let newLink = document.getElementById("newLink").value;
	let hexPattern = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
	let imgPattern = /.*\.jpg$|.*\.jpeg$|.*\.bmp$|.*\.png$/;

	// Code
	/* Clear errorBox */
	errorBox.innerHTML = "";

	/* Check informations */
	/* Name */
	if(newName == ""){
		ErrorHandler("N10");
		return;
	}else if(newName.length > 50){
		ErrorHandler("N20");
		return;
	}
	/* IMG */
	if(newImg == ""){
		ErrorHandler("I10");
		return;
	}else if(!newImg.match(imgPattern)){
		ErrorHandler("I20");
		return;
	}
	/* Bgcolor */
	if(newBgcolor == ""){
		newBgcolor = "#000000";
	}else if(!newBgcolor.match(hexPattern)){
		ErrorHandler("B10");
		return;
	}
	/* Link */
	if(newLink == ""){
		ErrorHandler("L10");
		return;
	}

	/* Send item */
	callback(newName, newImg, newOrigin, newBgcolor, newLink);
}

function GenXML(name, img, origin, bgcolor, link){
	// Variables
	let xhr = new XMLHttpRequest();
	let preview = document.getElementById("preview");
	let content="name="+encodeURIComponent(name);
	content += "&img="+encodeURIComponent(img);
	content += "&origin="+encodeURIComponent(origin);
	content += "&bgcolor="+encodeURIComponent(bgcolor);
	content += "&link="+encodeURIComponent(link);

	// Code
	xhr.onreadystatechange=function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
				GenPolaroid(xhr.responseXML, preview);
				preview.style.display = "flex";
            }
        }
    };
    xhr.open("POST","php/preview.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(content);	
}

function AddItem(name, img, origin, bgcolor, link){
	// Variables
	let xhr = new XMLHttpRequest();
	let passwd = document.getElementById("passwordInput").value;
	let content="name="+encodeURIComponent(name);
	content += "&img="+encodeURIComponent(img);
	content += "&origin="+encodeURIComponent(origin);
	content += "&bgcolor="+encodeURIComponent(bgcolor);
	content += "&link="+encodeURIComponent(link);
	content += "&passwd="+encodeURIComponent(passwd);

	// Code
	xhr.onreadystatechange=function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
				if(xhr.responseText !== ""){
					ErrorHandler(xhr.responseText);
				}else{
					list.innerHTML = "";
					LoadDB(list, GenTable);
				}
            }
        }
    };
    xhr.open("POST","php/addArticles.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(content);	
}

function RotateElement(tag, min, max){
	// Variables
	/* Generate a random integer between min and max, it can be positive OR negative */
	let deg = Math.floor(Math.random() * 2) ? Math.floor(Math.random() * (max - min + 1) + min) : Math.floor(Math.random() * (max - min + 1) - max);

	// Code
	/* Apply the generated number to an HTML element, as a rotation */
	tag.style.transform = "rotate(" + deg + "deg)";
}

window.addEventListener("load", function(){
	// Variables
	let articles = document.getElementById("articles");
	let list = document.getElementById("list");
	let addItem = document.getElementById("addItem");
	let newBgcolor = document.getElementById("newBgcolor");
	let newBgcolorPicker = document.getElementById("newBgcolorPicker");
	let previewButton = document.getElementById("previewButton");
	let preview = document.getElementById("preview");
	
	// Code
	if(articles !== null){
		LoadDB(articles, GenPolaroid);
	};

	if(list !== null){
		LoadDB(list, GenTable);
		addItem.addEventListener("click", () => CheckItem(AddItem));
		newBgcolor.addEventListener("keyup", function(){
			if(newBgcolor.value == "") newBgcolor.value = "#";
			newBgcolorPicker.value = newBgcolor.value;
		});
		newBgcolorPicker.addEventListener("input", function(){
			newBgcolor.value = newBgcolorPicker.value;
		});
		previewButton.addEventListener("click", function(){
			CheckItem(GenXML);
		});
		preview.addEventListener("click", function(event){
			if(event.target.id == preview.id){
				preview.style.display = "none";
				preview.innerHTML = "";
			}
		});
	}
});