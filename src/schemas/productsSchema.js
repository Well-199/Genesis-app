const ProductsSchema = {
    name: 'Products',
    primaryKey: 'id',
    properties: {
        id: 'string',
        produto: 'string',
        valor: 'double',
        status: 'bool'
    }
}

export default ProductsSchema;