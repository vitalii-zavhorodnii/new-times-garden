import { useSwiper } from 'swiper/react';

const PlantsPagination = ({ pages }: { pages: string[] }): JSX.Element => {
  const swiper = useSwiper();

  const renderPagination = (): JSX.Element[] => {
    const list = pages.map((categoryName, index) => {
      return (
        <li
          key={categoryName}
          onClick={() => swiper.slideTo(index)}
          className="swiper-extra-pagination__item"
        >
          {categoryName}
        </li>
      );
    });

    return list;
  };

  return <ul className="swiper-extra-pagination">{renderPagination()}</ul>;
};

export default PlantsPagination;
