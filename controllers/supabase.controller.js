const supabase = require('../services/supabaseClient');
const PrintedProduct = require('../models/printedProduct');
const ProductImage = require('../models/productImage');

// Mapping functions
function mapToPrintedProduct(product) {
  return new PrintedProduct({
    id: product.productid,
    name: product.name,
    description: product.description,
    price: product.price,
    printType: product.printtype,
    estPrintTime: product.estimatedprinttime,
    sku: product.sku,
    categoryId: product.categoryid,
    materialId: product.materialid
  });
}

function mapToProductImage(image) {
  return new ProductImage({
    imageId: image.imageid,
    productId: image.productid,
    imagePath: image.imagePath,
    alttext: image.alttext,
    displayOrder: image.displayorder
  });
}

exports.getProducts = async (req, res) => {
  try {
    console.log("GET /products hit");
    const { data, error } = await supabase.from('printed_products').select('*');
    if (error) throw error;

    console.log("Fetched products from Supabase:", data.length);

    const products = data.map(mapToPrintedProduct);

    const { data: images, error: error2 } = await supabase.from('product_images').select('*');
    if (error2) throw error2;

    console.log("Fetched product images from Supabase:", images.length);
    let productImages = [];
    if (images && images.length > 0) {
      productImages = images.map(mapToProductImage);
    }

    if (productImages && productImages.length > 0) {
      for (const product of products) {
        imagePaths = productImages
          .filter(image => image.productId === product.id && image.imagePath && !image.imagePath.toLowerCase().includes('.webm'))
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(image => image.imagePath);

        product.images = [];
        for (const imagePath of imagePaths) {
          const { data: signedUrlData, error: signedUrlError } = await supabase
            .storage
            .from('product-images')
            .createSignedUrl(imagePath, 60 * 60); // 1 hour expiry

          if (signedUrlError) {
            console.error(`Error getting signed URL for ${imagePath}:`, signedUrlError.message);
            continue;
          }
          product.images.push(signedUrlData.signedUrl);
        }
        console.log(`Product ID: ${product.id}, Images Count: ${product.images.length}`);
      }


    }

    res.json(products);
  } catch (err) {
    console.error("API error:", err.message);
    res.status(500).json({ error: err.message });
  }
};