const products = [];

// Create
function createProduct(product) {
  const newProduct = { id: Date.now(), ...product };
  products.push(newProduct);
  return newProduct;
}

// Read
function getProduct(id) {
  return products.find(product => product.id === id);
}

// Update
function updateProduct(id, updatedProduct) {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) {
    throw new Error('Product not found');
  }
  products[index] = { ...products[index], ...updatedProduct };
  return products[index];
}

// Delete
function deleteProduct(id) {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) {
    throw new Error('Product not found');
  }
  const deletedProduct = products.splice(index, 1)[0];
  return deletedProduct;
}

// Example usage
const product1 = createProduct({ productName: 'Product 1', price: 100, description: 'This is product 1' });
console.log(product1);

const product2 = getProduct(product1.id);
console.log(product2);

const updatedProduct = updateProduct(product1.id, { productName: 'Updated Product 1', price: 200 });
console.log(updatedProduct);

const deletedProduct = deleteProduct(product1.id);
console.log(deletedProduct);