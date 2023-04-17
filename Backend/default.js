import { products } from "./constants/data.js";
import product from "./model/product.schema.js";

const DefaultData = async () => {
  try {
    await product.insertMany(products);
    console.log("Data imported successfully");
  } catch (error) {
    console.log("Error while inserting default data", error.message);
  }
};
export default DefaultData;
