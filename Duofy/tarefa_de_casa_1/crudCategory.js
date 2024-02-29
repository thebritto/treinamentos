export async function getCategoryList() {
    const response = await fetch('http://localhost:3000/categories');
    const data = await response.json();
    return data;
  }
  
  export async function getCategoryItem(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`);
    const data = await response.json();
    return data;
  }
  
  export async function addCategoryItem(category) {
    const response = await fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  }
  
  export async function updateCategoryItem(id, name) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, name}),
    });
    const data = await response.json();
    return data;
  }
  
  export async function deleteCategoryItem(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  
  