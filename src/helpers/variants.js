function returnVariant(variants) {
    let images = [];
    let content = "";
    content += new Handlebars.SafeString(`
    <div class="rounded border p-3 mb-4" id="${variants[variants.length -1].id}">
    <label for="variantName${variants[variants.length -1].id}" class="form-label head">Variant Name</label>
    <input type="hidden" name="variant[${variants[variants.length -1].id}][id]" value="${variants[variants.length -1].id}">
    <input type="text" class="form-control mb-3 imageUpload${variants[variants.length -1].id}" id="variantName" name="variant[${variants[variants.length -1].id}][name]" value="${variants[variants.length -1].name}" required>
    <label for="variantQuantity${variants[variants.length -1].id}" class="form-label head">Quantity</label>
    <input type="hidden" name="variant[${variants[variants.length -1].id}][imageField]" value="${variants[variants.length -1].id}">
    <input type="number" min="1" step="1" class="form-control mb-3 inputQuantity variantQuantity" id="variantQuantity${variants[variants.length -1].id}" name="variant[${variants[variants.length -1].id}][quantity]" value="${variants[variants.length -1].quantity}" required>
    <input type="file" id="variantImage${variants[variants.length -1].id}" class="variantImageUpload${variants[variants.length -1].id} currentImage" name="${variants[variants.length -1].id}" accept="image/png, image/jpeg" multiple="">
    <div>`);
    if (variants[variants.length -1].images.length > 0) {
        variants[variants.length -1].images.forEach(image => {
            images.push(`<label for="variantImage${variants[variants.length -1].id}" class="custom-file-upload border rounded me-3 mb-3 variant variantImageUpload${variants[variants.length -1].id}" style="width: 112px; height: 76.5px; background-size: 100% 100%; background-image: url('../../../uploads/${image.imageName}')"></label>`);
        })
    }
    while (images.length != 3) {
        images.push(`<label for="variantImage${variants[variants.length -1].id}" class="custom-file-upload border rounded me-3 mb-3 variant variantImageUpload${variants[variants.length -1].id}" style="width: 112px; height: 76.5px; background-size: 100% 100%;"></label>`);
    }
    images.forEach(image => {
        content += image;
    })
    content += `</div><div id="${variants[variants.length -1].id}"></div></div>`;   
    for (let i = 0; i < variants.length; i++) {
        let images = [];
        if (i != variants.length - 1) {    
            content += `
            <div class="rounded border p-3 mb-4" id="${variants[i].id}">
            <button class="col btn btn-link border-0 float-end py-0 text-dark currentVariant" id="${variants[i].id}" title="Delete variant"><i class="bi bi-trash" id="${variants[i].id}"></i></button>
                <label for="variantName${variants[i].id}" class="form-label head">Variant Name</label>
                <input type="hidden" name="variant[${variants[i].id}][id]" value="${variants[i].id}">
                <input type="text" class="form-control mb-3 imageUpload0" id="variantName${variants[i].id}" name="variant[${variants[i].id}][name]" value="${variants[i].name}" required>
                <label for="variantQuantity${variants[i].id}" class="form-label head">Quantity</label>
                <input type="hidden" name="variant[${variants[i].id}][imageField]" value="${variants[i].id}">
                <input type="number" min="1" step="1" class="form-control mb-3 inputQuantity variantQuantity" id="variantQuantity${variants[i].id}" name="variant[${variants[i].id}][quantity]" value="${variants[i].quantity}" required>
                <input type="file" id="variantImage${variants[i].id}" class="variantImageUpload${variants[i].id} currentImage" name="${variants[i].id}" accept="image/png, image/jpeg" multiple="">
                <div>
            `
            if (variants[i].images.length > 0) {
                variants[i].images.forEach(image => {
                    images.push(`<label for="variantImage${variants[i].id}" class="custom-file-upload border rounded me-3 mb-3 variant variantImageUpload${variants[i].id}" style="width: 112px; height: 76.5px; background-size: 100% 100%; background-image: url('../../../uploads/${image.imageName}')"></label>`);
                })
            }
            while (images.length != 3) {
                images.push(`<label for="variantImage${variants[i].id}" class="custom-file-upload border rounded me-3 mb-3 variant variantImageUpload${variants[i].id}" style="width: 112px; height: 76.5px; background-size: 100% 100%;"></label>`);
            }
            images.forEach(image => {
                content += image;
            })
            content += `</div><div id="${variants[variants.length -1].id}"></div></div>`;     
        }
    } 
    return content
}
