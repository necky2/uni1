//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProductTile",
  //@@viewOff:statics
};

export const ProductTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string.isRequired,
      isInStock: UU5.PropTypes.bool.isRequired,
    }),
    onDelete: UU5.PropTypes.func.isRequired,
    onUpdate: UU5.PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    const _handleUpdateClick = () => {
      props.onUpdate(props.data);
    };
    const _handleDeleteClick = () => {
      props.onDelete(props.data);
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <div {...attrs}>
        <div className={tileInsideStyle}>
          <h3>{props.data.name}</h3>
          <p>{props.data.description}</p>
          <p className={stockInfoStyle(props.data.isInStock)}>{props.data.isInStock ? "In stock" : "Out of stock"}</p>
          <div className={productActionsContainerStyle}>
            <UU5.Bricks.Button colorSchema="danger" onClick={_handleDeleteClick}>
              <UU5.Bricks.Icon icon="mdi-delete" />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button colorSchema="primary" onClick={_handleUpdateClick}>
              <UU5.Bricks.Icon icon="mdi-pencil" />
            </UU5.Bricks.Button>
          </div>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default ProductTile;

const className = Config.Css.css`
  background: lightgray;
  padding: 8px 16px;
`;

const tileInsideStyle = Config.Css.css`
  position: relative;
`;

const stockInfoStyle = (isInStock) => Config.Css.css`
  color: ${isInStock ? "green" : "red"};
`;

const productActionsContainerStyle = Config.Css.css`
   position: absolute;
   right: 0;
   top: 0;
   > *:not(:last-child) {
     margin-right: 4px;
   }
`;
