import { ProductsCollection } from '../db/models/products.js';
import { SORT_ORDER } from '../constants/index.js';

export const getALLProducts = async ({
  userId,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const productsQuery = ProductsCollection.find({ userId });
  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }
  productsQuery.sort({
    [sortBy]: sortOrder,
  });
  const products = await productsQuery;
  return products;
};

export const getProductById = async ({ productId, userId }) => {
  const product = await ProductsCollection.findOne({ _id: productId, userId });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (
  productId,
  userId,
  payload,
  options = {},
) => {
  const updateProduct = await ProductsCollection.findOneAndUpdate(
    { _id: productId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!updateProduct || !updateProduct.value) {
    return null;
  }
  return {
    contact: updateProduct.value,
    isNew: false,
  };
};

export const deleteProduct = async (productId, userId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
    userId,
  });
  return product;
};
