class PrintedProduct {
    constructor({ id, name, description, printType, materialId, price, estPrintTime, sku, categoryId }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.printType = printType;
        this.estPrintTime = estPrintTime;
        this.sku = sku;
        this.categoryId = categoryId;
        this.materialId = materialId;
        this.images = [];
    }

    toJSON() {
    return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            printType: this.printType,
            estPrintTime: this.estPrintTime,
            sku: this.sku,
            categoryId: this.categoryId,
            materialId: this.materialId,
            images: this.images
        };
    }
}

module.exports = PrintedProduct;