class ProductImage {
    constructor({ imageId, productId, imagePath, alttext, displayOrder }) {
        this.imageId = imageId;
        this.productId = productId;
        this.imagePath = imagePath;
        this.alttext = alttext;
        this.displayOrder = displayOrder;
    }

    toJSON() {
        return {
            imageId: this.imageId,
            productId: this.productId,
            imagePath: this.imagePath,
            alttext: this.alttext,
            displayOrder: this.displayOrder,
        };
    }
}

module.exports = ProductImage;