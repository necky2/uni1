import UU5 from "uu5g04";
import ShopLib from "ShopLib";

const { shallow } = UU5.Test.Tools;

describe(`ShopLib.Bricks.ProductTile`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<ShopLib.Bricks.ProductTile />);
    expect(wrapper).toMatchSnapshot();
  });
});
