import React, {useEffect, useContext, useState} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import styles from './relatedItemsCarousel.module.css';

const RelatedItemsCarousel = props => {
  const { getRelatedProducts, getRelatedProductInfoById } = useContext(APIContext);
  const { relatedProducts, setRelatedProducts } = useContext(RelatedContext);

  useEffect(() => {
    getRelatedProducts();
  }, []);

  // track left most card index
  const [leftIndex, setLeftIndex] = useState(0);

  // track relative movement of carousel to get true index
  const [movement, setMovement] = useState(0);

  let relatedItems = relatedProducts.slice();

  // let relatedItems = props.data.sampleRelatedId;
  let displayedItems = relatedItems.slice(leftIndex, leftIndex + 4);

  // onclick function for right arrow button
  let nextItem = () => {
    setLeftIndex(leftIndex + 1);
    setMovement(movement + 1);
  };

  // onclick function for left arrow button
  let previousItem = () => {
    setLeftIndex(leftIndex === 0 ? leftIndex - 0 : leftIndex - 1);
    setMovement(movement === 0 ? movement - 0 : movement - 1);
  };

  return (
    <div className={styles.carousel}>
      {leftIndex === 0 ? <div></div> : <button className={styles.carouselButton} onClick={previousItem}><i className="fas fa-angle-left"></i></button>}
      {displayedItems.map((id, index) => {
        return <RelatedItemCard key={index} relatedId={id} data={props.data} index={index} movement={movement}/>
      })}
      {leftIndex === relatedItems.length - 4 ?
        null : <button className={styles.carouselButton} onClick={nextItem}><i className="fas fa-angle-right"></i></button>
      }
    </div>
  )
}

export default RelatedItemsCarousel;