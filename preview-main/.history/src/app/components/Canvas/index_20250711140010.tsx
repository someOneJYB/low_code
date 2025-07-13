import React from 'react';
import styles from './index.module.css';

interface InsuranceCardProps {
  productName?: string;
  tags?: string[];
  price?: string;
  unit?: string;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({
  productName = "蓝医保·长期医疗险（好医好药版）",
  tags = ["保证续保20年", "开放70周岁可投", "震撼升级"],
  price = "12.78",
  unit = "起/月"
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.productName}>{productName}</h2>
      </div>
      
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tagItem}>
            <span className={styles.bullet}>&bull;</span>
            <span className={styles.tagText}>{tag}</span>
          </div>
        ))}
      </div>
      
      <div className={styles.priceContainer}>
        <span className={styles.currency}>￥</span>
        <span className={styles.price}>{price}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      
      <div className={styles.footer}>
        <button className={styles.ctaButton}>立即投保</button>
      </div>
      
      <div className={styles.highlightBadge}>热门推荐</div>
    </div>
  );
};

export default InsuranceCard;