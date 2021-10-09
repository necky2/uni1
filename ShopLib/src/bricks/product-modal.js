//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ProductModal",
  //@@viewOff:statics
};

export const ProductModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props, ref) {
    //@@viewOn:hooks
    const modalRef = useRef();
    useImperativeHandle(ref, () => ({
      open: _openModal,
    }));
    //@@viewOff:hooks

    //@@viewOn:private
    const _openModal = (onSave, initialValues) => {
      function _onSave({ values }) {
        onSave(values);
        modalRef.current.close();
      }

      modalRef.current.open({
        header: "Product",
        content: (
          <UU5.Forms.ContextForm values={initialValues} onSave={_onSave} onCancel={modalRef.current.close}>
            <UU5.Forms.Text label="Name" name="name" required />
            <UU5.Forms.TextArea label="Description" name="description" required />
            <UU5.Forms.Checkbox label="In stock" name="isInStock" />
          </UU5.Forms.ContextForm>
        ),
        footer: <UU5.Forms.ContextControls />,
      });
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return <UU5.Forms.ContextModal {...attrs} ref_={modalRef} />;
    //@@viewOff:render
  },
});

export default ProductModal;

const className = Config.Css.css``;
