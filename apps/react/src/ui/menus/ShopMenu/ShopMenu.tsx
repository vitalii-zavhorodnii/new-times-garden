import ShopMenuItem from './ShopMenuItem';
import type { IProductsModel } from '@models/products.model';

interface IShopMenuProps {
  productsList: IProductsModel[];
  handleModal: (value: boolean) => void;
}

const ShopMenu = ({ productsList, handleModal }: IShopMenuProps): JSX.Element => {
  const handleClickItem = (data: IProductsModel): void => {
    console.log(data);
    handleModal(false);
  };

  const renderMenu = (): JSX.Element[] => {
    const list = productsList.map((product) => {
      return (
        <ShopMenuItem
          key={product._id}
          onClick={() => handleClickItem(product)}
          value={product.value}
          price={product.price}
          oldPrice={product.oldPrice}
          image={product.img}
        />
      );
    });

    return list;
  };

  return <ul className="shop-menu__container">{renderMenu()}</ul>;
};

export default ShopMenu;
