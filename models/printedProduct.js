class PrintedProduct {
    constructor({ id, name, longDescription, shortDescription, printType, materialId, price, estPrintTime, sku, categoryId, size }) {
        this.id = id;
        this.name = name;
        this.longDescription = longDescription;
        this.price = price;
        this.printType = printType;
        this.estPrintTime = estPrintTime;
        this.sku = sku;
        this.categoryId = categoryId;
        this.materialId = materialId;
        this.shortDescription = shortDescription;
        this.size = size;
        this.images = [];
    }

    toJSON() {
    return {
            id: this.id,
            name: this.name,
            longDescription: this.longDescription,
            price: this.price,
            printType: this.printType,
            estPrintTime: this.estPrintTime,
            sku: this.sku,
            categoryId: this.categoryId,
            materialId: this.materialId,
            images: this.images,
            shortDescription: this.shortDescription,
            size: this.size
        };
    }
}

module.exports = PrintedProduct;