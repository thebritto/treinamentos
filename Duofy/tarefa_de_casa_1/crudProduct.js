export async function getProductList() {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
  }
  
  export async function getProductItem(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const data = await response.json();
    return data;
  }
  
  export async function addProductItem(product) {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }
  
  export async function updateProductItem(product) {
    const response = await fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }
  
  export async function deleteProductItem(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  
  