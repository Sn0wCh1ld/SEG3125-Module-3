function populateListProductChoices() {
	var dietSelector = document.getElementById("dietSelection");
    var productDisplay = document.getElementById("displayProduct");
    var checkboxes = dietSelect.getElementsByTagName("input");

    var productSelection = document.getElementById("productSelection");
    productSelection.style.display = "block";

    var cart = document.getElementById('cart');
    cart.style.display = "block";

    var controls = document.getElementById('controls');
    controls.style.display = "block";

    dietSelector.style.display = "none";

    productDisplay.innerHTML = "";
	
	var restrictions = [];
	for (i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
            restrictions.push(checkboxes[i].value);
		}
    }
    


	console.log(restrictions);

	var optionArray = restrictListProducts(products, restrictions);

	for (i = 0; i < optionArray.length; i++) {

		var productName = formatProductName(optionArray[i].name, optionArray[i].price);

        var productEntry = document.createElement("div");
        productEntry.className = "productEntry";
        

		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
        checkbox.value = productName;
        checkbox.addEventListener("click", selectItems);
        productEntry.appendChild(checkbox);

		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName));
        productEntry.appendChild(label);
        
        productEntry.appendChild(document.createElement("br"));
        productEntry.appendChild(document.createElement("br"));

        // add image
        var image = document.createElement("img");
        image.src = optionArray[i].image;
        image.className = "productImage"
        productEntry.appendChild(image);
        
        productDisplay.appendChild(productEntry);
	}
}

function restrictListProducts(products, restrictions) {
    products.sort(comparePrice);
    
    let type = foodType();
    console.log(type);
	
	let selectedProducts = [];

	for (let i = 0; i < products.length; i += 1) {
        let product = products[i];

		if (!((restrictions.includes("Vegetarian") && (!product.vegetarian)) ||
			(restrictions.includes("GlutenFree") && (!product.glutenFree) ||
				(restrictions.includes("Organic") && (!product.organic))
			))) {

                console.log(product.type);
            if (type == 3 || product.type == type) {
                selectedProducts.push(product);
            }
		}
	}

	return selectedProducts;
}

function foodType() {
    var types = document.getElementsByName('foodType');
    for(var i = 0; i < types.length; i++)
    {
        if(types[i].checked)
        {
            return types[i].value;
        }
    }
}

function comparePrice(item1, item2) {
	if (item1.price < item2.price) {
		return -1;
	}
	if (item1.price > item2.price) {
		return 1;
	}
	return 0;
}

function formatProductName(productName, price)
{
	return productName + " ($" + price + ")";
}

function selectItems() {

	var productChecboxes = document.getElementsByName("product");
	var chosenProducts = [];

	var cart = document.getElementById('displayCart');
	cart.innerHTML = "";

	// build list of selected item
	var para = document.createElement("p");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < productChecboxes.length; i++) {
		if (productChecboxes[i].checked) {
			para.appendChild(document.createTextNode(productChecboxes[i].value));
			para.appendChild(document.createElement("br"));

			console.log(productChecboxes[i].value)
			chosenProducts.push(productChecboxes[i].value);
		}
	}

	// add paragraph and total price
	cart.appendChild(para);
	cart.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));

}

function getTotalPrice(chosenProducts) {
	console.log(chosenProducts);

	totalPrice = 0;
	for (let i = 0; i < products.length; i += 1) {
		let formattedName = formatProductName(products[i].name, products[i].price);
		if (chosenProducts.indexOf(formattedName) > -1) {
			totalPrice += products[i].price;
		}
	}
	return totalPrice.toFixed(2);
}