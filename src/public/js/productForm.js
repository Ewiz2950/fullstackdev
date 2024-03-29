const categories = {
    "Household Appliances": ["Fridge", "Washing Machine", "Stove", "Oven", "Fan"],
    "Mobile & Tablets": ["Mobile Phone", "Tablet"],
    "Laptops & Monitors": ["Laptop", "Monitor"],
    "Misc": ["TVs & Audio", "Accessories"]
}

let number = 0;

var categorySelect = document.getElementById('category');

function showImages(className, id) {
    var upload = document.getElementById(id);
    if (upload.files && upload.files.length <= 3) {
        var inputLabels = document.querySelectorAll(".custom-file-upload." + className);
        for (var i = 0; i < inputLabels.length; i++) {
            inputLabels[i].style.background = "url('../../../images/addimage.jpg')";
            inputLabels[i].style.backgroundSize = "100% 100%"
        }

        if (upload.value != "") {
            var index = 0;
            var fileList = upload.files;

            for (var i = 0; i < fileList.length; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    inputLabels[index].style.background = 'url("' + e.target.result + '")';
                    inputLabels[index].style.backgroundSize = "100% 100%";
                    index += 1;
                };

                reader.readAsDataURL(fileList[i]);
            }
        } else {
            for (var i = 0; i < inputLabels.length; i++) {
                inputLabels[i].style.background = "url('../../../images/addimage.jpg')";
                inputLabels[i].style.backgroundSize = "100% 100%"
            }
        }
    } else {
        document.getElementById(className).innerHTML = "You can only upload a maximum of 3 images"
    }
}

var elementExists = document.getElementById("variantImage0");
if (elementExists) {
    elementExists.addEventListener('change', function () {
        showImages("variantImageUpload0", "variantImage0")
    });
}

function subcategories() {
    var subCategorySelect = document.getElementById('subcategory');
    subCategorySelect.innerHTML = "";
    categories[categorySelect.value].forEach(element => {
        var option = document.createElement('option');
        option.text = element;
        option.value = element;
        option.class = 'subcategory';
        subCategorySelect.appendChild(option);
    })
}

function addSum() {
    let sum = 0;
    let variantQuantityList = document.querySelectorAll('.variantQuantity');
    if (variantQuantityList.length != 0) {
        variantQuantityList.forEach(element => {
            if (element.value == '') {
                sum += 0
            } else {
                sum += parseInt(element.value)
            };
        })
        document.getElementById('productQuantity').value = sum;
    }
    
    let inputQuantityList = document.querySelectorAll('.inputQuantity');
    inputQuantityList.forEach(element => {
        element.addEventListener('change', function () {
            let sum = 0;
            let variantQuantityList = document.querySelectorAll('.variantQuantity');
            if (variantQuantityList.length != 0) {
                variantQuantityList.forEach(element => {
                    if (element.value == '') {
                        sum += 0
                    } else {
                        sum += parseInt(element.value)
                    };
                })
                document.getElementById('productQuantity').value = sum;
            }
        })
    })
}

function addVariant(number) {
    var div = document.createElement('div');
    div.setAttribute("class", "border rounded p-3 mb-4");
    div.setAttribute("id", "variant" + number);
    var deleteVariant = document.createElement("button");
    deleteVariant.setAttribute("class", "col btn btn-link border-0 float-end py-0 text-dark");
    deleteVariant.setAttribute("id", "deleteVariant" + number);
    deleteVariant.setAttribute("title", "Delete variant");
    deleteVariant.innerHTML = '<i class="bi bi-trash"></i>';
    var label = document.createElement('label');
    label.setAttribute("for", "variantName" + number);
    label.setAttribute("class", "form-label head");
    label.innerHTML = "Variant Name";
    var input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control mb-3 imageUpload" + number);
    input.setAttribute("id", "variantName" + number);
    input.setAttribute("name", `variant[${number}][name]`);
    input.setAttribute("required", "");
    var hidden = document.createElement('input');
    hidden.setAttribute("type", "hidden");
    hidden.setAttribute("name", `variant[${number}][imageField]`);
    hidden.setAttribute("value", "variantImage" + number);
    var inputFile = document.createElement('input');
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("id", "variantImage" + number);
    inputFile.setAttribute("class", "variantImageUpload" + number);
    inputFile.setAttribute("name", "variantImage" + number);
    inputFile.setAttribute("accept", "image/png, image/jpeg");
    inputFile.setAttribute("multiple", "");
    var labelQuantity = document.createElement('label');
    labelQuantity.setAttribute("for", "variantQuantity" + number);
    labelQuantity.setAttribute("class", "form-label head");
    labelQuantity.innerHTML = "Quantity";
    var inputQuantity = document.createElement('input');
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("step", 1);
    inputQuantity.setAttribute("required", "");
    inputQuantity.setAttribute("class", "form-control mb-3 inputQuantity variantQuantity");
    inputQuantity.setAttribute("id", "variantQuantity" + number);
    inputQuantity.setAttribute("name", `variant[${number}][quantity]`);
    var divRow = document.createElement('div');
    divRow.class = "row g-0";
    for (let i = 1; i < 4; i++) {
        var imageLabel = document.createElement('label');
        imageLabel.setAttribute("for", "variantImage" + number);
        imageLabel.setAttribute("class", "custom-file-upload border rounded me-3 mb-3 variant variantImageUpload" + number);
        imageLabel.style.width = "112px";
        imageLabel.style.height = "76.5px";
        imageLabel.style.backgroundSize = "100% 100%";
        divRow.appendChild(imageLabel);
    }
    var imageError = document.createElement("div");
    imageError.id = "variantImageUpload" + number;
    imageError.class = "form-text text-danger";
    div.appendChild(deleteVariant);
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(hidden);
    div.appendChild(labelQuantity);
    div.appendChild(inputQuantity);
    div.appendChild(inputFile);
    div.appendChild(divRow);
    div.appendChild(imageError);
    document.getElementById("variantList").appendChild(div);
    document.getElementById('variantImage' + number).addEventListener('change', function () {
        showImages("variantImageUpload" + number, "variantImage" + number)
    });
    document.getElementById('deleteVariant' + number).addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById("variant" + number).remove();
    });

    addSum();
}

document.addEventListener('DOMContentLoaded', function () {
    subcategories()
})

categorySelect.addEventListener('change', function () {
    subcategories()
});

document.getElementById('addVariant').addEventListener('click', function (event) {
    event.preventDefault();
    number += 1;
    addVariant(number);
});

document.addEventListener("DOMContentLoaded", function () {
    addSum();

    document.getElementById("mainImage").onchange = function() {
        var reader = new FileReader();
    
        reader.onload = function (e) {
            document.getElementById("mainLabel").style.background = 'url("' + e.target.result + '")';
            document.getElementById("mainLabel").style.backgroundSize = "100% 100%";
        };
    
        reader.readAsDataURL(this.files[0]);
    }

    let currentVariants = document.querySelectorAll('.currentVariant');
    currentVariants.forEach(v => {
        v.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById(event.target.id).remove();
        });
    })

    let currentImages = document.querySelectorAll('.currentImage');
    currentImages.forEach(v => {
        v.addEventListener('change', function (event) {
            showImages(event.target.className.split(" ")[0], event.target.id);
        });
    })
});