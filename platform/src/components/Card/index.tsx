import React from "react";
import styles from "./index.module.css";

interface InsuranceCardProps {
  style: any;
  productName?: string;
  tags?: string[];
  price?: string;
  unit?: string;
  link: string;
  url?: string;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({
  style,
  productName,
  tags,
  price,
  unit,
  link,
  url,
}) => {
  return (
    <div style={{ position: 'relative' }}>
 <div className={styles.card} style={style}>
        <img className={styles.imgCard} src={url} />
      <div>
         <h2 className={styles.productName}>{productName}</h2>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tagItem}>
              <span className={styles.tagText}>{tag}</span>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
 <div className={styles.priceContainer}>
          <span className={styles.currency}>￥</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.unit}>{unit}</span>
        </div>

        <div
          className={styles.footer}
          onClick={() => (window.open(link))}
        >
          <button className={styles.ctaButton}>立即投保</button>
        </div>
        </div>

        <div className={styles.highlightBadge}>热门推荐</div>
      </div>
    </div>
    </div>
  );
};

export default InsuranceCard;
