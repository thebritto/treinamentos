import * as Category from './crudCategory.js';
import * as Product from './crudProduct.js';

async function testeCrudCategory() {

    //pegando a lista de categorias
    console.log('pegando a lista de categorias');
    let categoryList = await Category.getCategoryList();
    console.log(categoryList);

    //pegando uma categoria especifica
    console.log('pegando uma categoria especifica (1)');
    const category1 = await Category.getCategoryItem('1');
    console.log(category1);

    //adicionando uma catetoria (5)
    console.log('adicionando uma catetoria (5)');
    if (categoryList.find(category => category.id === '5') === undefined) {
        let category5 = { id: '5', name: 'Category 5' }
        await Category.addCategoryItem(category5);
        categoryList = await Category.getCategoryList();
        console.log(categoryList);
    }

    //alterando a categoria (5)
    console.log('alterando a categoria (5)');
    if (categoryList.find(category => category.id === '5')) {
        await Category.updateCategoryItem('5','Category 5 changed');
        categoryList = await Category.getCategoryList();
        console.log(categoryList);
    }

    //excluindo a categoria (5)
    console.log('excluindo a categoria (5)');
    if (categoryList.find(category => category.id === '5')) {
        await Category.deleteCategoryItem('5');
        categoryList = await Category.getCategoryList();
        console.log(categoryList);
    }
}
//testeCrudCategory()

async function testeCrudProduct() {

    //pegando a lista de categorias
    console.log('pegando a lista de produtos');
    let productList = await Product.getProductList();
    console.log(productList);

    //pegando um produto especifico
    console.log('pegando um produto especifico (1)');
    const product1 = await Product.getProductItem('1');
    console.log(product1);

    //adicionando um produto (6)
    console.log('adicionando um produto (6)');
    
    let categoryId = '3';
    let categoryList = await Category.getCategoryList();
    let product6 = productList.find(product => product.id === '6');
    if (product6 === undefined) {
        if (categoryList.find(category => category.id === categoryId)) {
            product6 = {
                id: "6",
                name: "Product 6",
                price: "123",
                category: categoryId
            };
            await Product.addProductItem(product6);
            productList = await Product.getProductList();
            console.log(productList);
        } else {
            console.log(`Categoria ${categoryId} não encontrada! Não será possível incluir o produto`);
        }
    }

    //alterando o produto (6)
    console.log('alterando o produto (6)');
    product6 = productList.find(product => product.id === '6');
    if (product6 !== undefined) {
        product6.name = "Product 6 changed"
        product6.price = "215"
        await Product.updateProductItem(product6);
        productList = await Product.getProductList();
        console.log(productList);
    }

    //excluindo o produto (6)
    console.log('excluindo o produto (6)');
    product6 = productList.find(product => product.id === '6');
    if (product6 !== undefined) {
        await Product.deleteProductItem('6');
        productList = await Product.getProductList();
        console.log(productList);
    }
}
//testeCrudProduct();


async function relCategory() {

    const categoryList = await Category.getCategoryList();
    const productList = await Product.getProductList();

    const relData = categoryList.map(category => {
        let procutsCount = 0
        let priceSum = 0
        let averagePrice = 0
        
        //filtro os produtos da categoria
        const productsOfCategory = productList.filter(product => {
            return product.category == category.id;
        })

        procutsCount= productsOfCategory.length;
        priceSum = productsOfCategory.reduce((sum, procuct) => {
            return sum + parseFloat(procuct.price);
          }, 0);
        
        //faço a media dos preços
        if (procutsCount > 0)
            averagePrice = priceSum/procutsCount;
        return {
            ...category,
            procutsCount : procutsCount,
            averagePrice : averagePrice
        }
    })

    //console.log(relData)

    console.log('Relatório de Categorias')
    console.log('------------------------------------------------------')
    console.log('Id   / Nome Categorias  / Qtd Produtos  / Media Preços')

    for (let itemRelData of relData) {
      console.log(`${itemRelData.id}    / ${itemRelData.name}       /       ${itemRelData.procutsCount}       /     ${itemRelData.averagePrice}`);
    }

}
//relCategory();