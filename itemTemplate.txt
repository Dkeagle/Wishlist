JSON Item template:

{
	"name": "",
	"img": "",
	"origin": "",
	"bgColor": ""
	"link": ""
}


name: The name of the item, will be displayed below the image.

img: Link to a picture of the item.

origin: Must match one of these values:
	"tl" => image origin point will be Top Left,
	"tr" => top Right,
	"bl" => Bottom Left,
	"br" => Bottom Right,
	"center" => Image will be centered.

	NOTE: origin can be omitted, if so, the image CSS won't be "object-fit: cover", but "object-fit: scale-down".

bgColor: Must be a correct color value:
	"white", 
	"#FFFFFF",
	"rgb(255, 255, 255)",
	"rgba(255, 255, 255, 1)".

	NOTE: bgColor can be omitted, if so, the img tag will have a default "background: #000000".

link: Link to the shop page of the item.