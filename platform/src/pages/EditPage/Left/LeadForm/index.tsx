// src/components/LeadForm/LeadForm.jsx
import {defaultComponentStyle} from "src/utils/const";
import leftSideStyles from "../leftSide.module.less";
import { isLeadFormComponent } from "../index";
import useEditStore from "src/store/editStore";
import { ICmp } from "src/store/editStoreTypes";
import image from '../../../../assets/image.png'
import React, { useState } from 'react';
import styles from './index.module.css';

const defaultStyle = {
  width: 200,
  height: 300,
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  backgroundImage: '',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  title: '获取专属方案',
  description: '填写信息，我们的专家将在24小时内联系您',
  submitText: '立即咨询',
  themeColor: '#4361ee',
};

const settings = [
  {
    value: "",
    style: {
      ...defaultStyle,
    },
    fields:  [
    { name: 'name', label: '姓名', type: 'text', placeholder: '请输入您的姓名', required: true },
    { name: 'phone', label: '手机号', type: 'tel', placeholder: '请输入您的手机号', required: true },
  ],
  },
];



export const LeadFormItem = (props: any) => {
  console.log(props)
  const {
  width = '200px',
  height = 'auto',
  position = 'absolute',
  top = '10px',
  left = '10px',
  right = 'auto',
  bottom = 'auto',
  backgroundColor = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  backgroundImage = '',
  padding = '30px',
  borderRadius = '12px',
  boxShadow = '0 10px 30px rgba(0,0,0,0.15)',
  title = '获取专属方案',
  description = '填写信息，我们的专家将在24小时内联系您',
  submitText = '立即咨询',
  themeColor = '#4361ee',
  } = props.style
  const fields = props.fields;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label}不能为空`;
      }
      
      // 手机号格式验证
      if (field.name === 'phone' && formData[field.name]) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(formData[field.name])) {
          newErrors[field.name] = '请输入有效的手机号码';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 模拟API请求
      setTimeout(() => {
        onSubmit(formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // 5秒后重置表单
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({});
        }, 5000);
      }, 1000);
    }
  };

  const containerStyle = {
    width,
    height,
    position,
    top,
    left,
    right,
    bottom,
    padding,
    borderRadius,
    boxShadow,
    transform: position === 'fixed' || position === 'absolute' ? 'translate(-50%, -50%)' : 'none',
    zIndex: 1000,
    background: backgroundImage 
      ? `url(${backgroundImage}) center/cover, ${backgroundColor}` 
      : backgroundColor,
    color: '#fff',
    overflow: 'hidden'
  };

  // 设置CSS变量
  const formStyle = {
    '--theme-color': themeColor
  };

  if (isSubmitted) {
    return (
      <div style={containerStyle} className={styles.container}>
        <div className={styles.successMessage}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2>提交成功！</h2>
          <p>我们的顾问将尽快联系您</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={styles.container}>
      <div className={styles.formHeader}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className={styles.leadForm}
        style={formStyle}
      >
        {fields.map((field) => (
          <div key={field.name} className={styles.formGroup}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={errors[field.name] ? styles.error : ''}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={errors[field.name] ? styles.error : ''}
              />
            )}
            {errors[field.name] && (
              <div className={styles.errorMessage}>{errors[field.name]}</div>
            )}
          </div>
        ))}
        
        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span> 提交中...
            </>
          ) : (
            submitText
          )}
        </button>
      </form>
    </div>
  );
};
export default function LeadForm() {
  const editStore = useEditStore();
  const addCmp = (_cmp: ICmp) => {
    editStore.addCmp(_cmp);
  };

  const onDragStart = (e: any, _cmp: any) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item, index) => (
          <li
            key={"item" + index}
            className={leftSideStyles.item}
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
            }}
            onClick={() => addCmp({...item, type: isLeadFormComponent})}
            draggable="true"
            onDragStart={(e) =>
              onDragStart(e, {...item, type: isLeadFormComponent})
            }>
            <LeadFormItem {...item} />
            </li>
        ))}
      </ul>
    </div>
  );
}