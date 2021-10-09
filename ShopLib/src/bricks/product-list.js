//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import ProductTile from "./product-tile";
import ProductModal from "./product-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProductList",
  //@@viewOff:statics
};

const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 13",
    description: "512GB, Sierra Blue",
    isInStock: true,
  },
  {
    id: "2",
    name: "iPhone 11",
    description: "256GB, Product Red",
    isInStock: false,
  },
];

export const ProductList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const productModalRef = useRef();
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    //@@viewOff:hooks

    //@@viewOn:private
    const _createProduct = (product) => {
      const productToCreate = { ...product, id: UU5.Common.Tools.generateUUID() };

      setProducts([...products, productToCreate]);
    };

    const _deleteProduct = (product) => {
      const newProducts = [...products];
      const productIndex = newProducts.findIndex(({ id }) => id === product.id);
      newProducts.splice(productIndex, 1);
      setProducts(newProducts);
    };

    const _updateProduct = (product) => {
      console.log({ product });
      const newProducts = [...products];
      const productIndex = newProducts.findIndex(({ id }) => id === product.id);
      newProducts[productIndex] = product;
      setProducts(newProducts);
    };

    const _openCreateModal = () => {
      productModalRef.current.open(_createProduct);
    };

    const _openUpdateModal = (product) => {
      productModalRef.current.open((newValues) => _updateProduct({ ...newValues, id: product.id }), product);
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <div {...attrs}>
        <h2>Product List</h2>
        <Uu5Tiles.Grid tileMinWidth={200} tileMaxWidth={400} tileSpacing={8} rowSpacing={8} data={products}>
          <ProductTile onDelete={_deleteProduct} onUpdate={_openUpdateModal} className={productStyle} />
        </Uu5Tiles.Grid>
        <UU5.Bricks.Button onClick={_openCreateModal} colorSchema="primary" className={addButtonStyle}>
          Add new product
        </UU5.Bricks.Button>
        <ProductModal ref={productModalRef} />
      </div>
    );
    //@@viewOff:render
  },
});

export default ProductList;

const className = Config.Css.css``;

const productStyle = Config.Css.css`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const addButtonStyle = Config.Css.css`
  margin-top: 16px;
`;
