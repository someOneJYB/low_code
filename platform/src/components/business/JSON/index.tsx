// src/components/JsonEditor/JsonEditor.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.css';

const JsonEditor = ({ 
  initialJson = '{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false,\n  "address": {\n    "street": "123 Main St",\n    "city": "Anytown"\n  },\n  "hobbies": ["reading", "gaming", "coding"]\n}', 
  onSave,
  onChange
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonTree, setJsonTree] = useState([]);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'code'
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef(null);

  // 初始化JSON数据
  useEffect(() => {
    try {
      // 如果传入的是对象，转换为字符串
      if (typeof initialJson === 'object') {
        const formatted = JSON.stringify(initialJson, null, 2);
        setJsonInput(formatted);
      } else {
        setJsonInput(initialJson);
      }
      setIsDirty(false);
    } catch (err) {
      setError(`初始化JSON错误: ${err.message}`);
      setJsonInput('{}');
    }
  }, [initialJson]);

  // 解析JSON并生成树形结构
  const parseJsonToTree = useCallback((jsonString) => {
    try {
      if (!jsonString.trim()) {
        setJsonTree([]);
        setError('');
        return;
      }
      
      const parsed = JSON.parse(jsonString);
      setError('');
      
      const buildTree = (data, path = '') => {
        if (typeof data === 'object' && data !== null) {
          return Object.keys(data).map((key, index) => {
            const newPath = path ? `${path}.${key}` : key;
            return {
              id: `${newPath}-${index}`,
              key,
              value: data[key],
              type: Array.isArray(data) ? 'array' : typeof data,
              path: newPath,
              children: typeof data[key] === 'object' && data[key] !== null 
                ? buildTree(data[key], newPath) 
                : null,
              expanded: true,
              depth: path.split('.').length
            };
          });
        }
        return [];
      };
      
      setJsonTree(buildTree(parsed));
      
      // 调用onChange回调（如果提供）
      if (onChange) {
        onChange(parsed);
      }
    } catch (err) {
      setError(`JSON解析错误: ${err.message}`);
      console.error('JSON解析错误:', err);
    }
  }, [onChange]);

  // 初始化和输入变化时解析JSON
  useEffect(() => {
    parseJsonToTree(jsonInput);
  }, [jsonInput, parseJsonToTree]);

  // 处理输入变化
  const handleInputChange = (value) => {
    setJsonInput(value);
    setIsDirty(true);
  };

  // 格式化JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonInput(formatted);
      setError('');
      setIsDirty(true);
    } catch (err) {
      setError(`格式化错误: ${err.message}`);
    }
  };

  // 压缩JSON
  const compressJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const compressed = JSON.stringify(parsed);
      setJsonInput(compressed);
      setError('');
      setIsDirty(true);
    } catch (err) {
      setError(`压缩错误: ${err.message}`);
    }
  };

  // 复制JSON到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
  };

  // 处理保存
  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (onSave) {
        onSave(parsed);
      }
      setIsDirty(false);
      setError('');
    } catch (err) {
      setError(`保存错误: ${err.message}`);
    }
  };

  // 重置为初始值
  const handleReset = () => {
    setJsonInput(typeof initialJson === 'object' 
      ? JSON.stringify(initialJson, null, 2) 
      : initialJson);
    setIsDirty(false);
    setError('');
  };

  // 处理文本区域按键事件（Tab键缩进）
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      // 插入两个空格
      const newValue = jsonInput.substring(0, start) + '  ' + jsonInput.substring(end);
      
      setJsonInput(newValue);
      setIsDirty(true);
      
      // 移动光标位置
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // 切换节点展开/折叠
  const toggleNode = (id) => {
    const updateTree = (nodes) => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    
    setJsonTree(updateTree(jsonTree));
  };

  // 渲染值
  const renderValue = (value) => {
    if (value === null) return <span className={styles.jsonNull}>null</span>;
    switch (typeof value) {
      case 'string':
        return <span className={styles.jsonString}>"{value}"</span>;
      case 'number':
        return <span className={styles.jsonNumber}>{value}</span>;
      case 'boolean':
        return <span className={styles.jsonBoolean}>{value.toString()}</span>;
      default:
        return JSON.stringify(value);
    }
  };

  // 渲染树节点
  const renderTreeNode = (node) => (
    <div key={node.id} className={styles.treeNode}>
      <div 
        className={styles.nodeHeader} 
        style={{ paddingLeft: `${node.depth * 20}px` }}
      >
        {node.children && (
          <button 
            className={styles.toggleBtn}
            onClick={() => toggleNode(node.id)}
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        <span className={styles.jsonKey}>{node.key}:</span>
        {!node.children && renderValue(node.value)}
        {node.children && !node.expanded && (
          <span className={styles.jsonCollapsed}>
            {Array.isArray(node.value) ? '[ ... ]' : '{ ... }'}
          </span>
        )}
      </div>
      
      {node.children && node.expanded && (
        <div className={styles.nodeChildren}>
          {node.children.map(renderTreeNode)}
        </div>
      )}
    </div>
  );

  // 语法高亮
  const highlightJson = (json) => {
    if (!json) return '';
    
    return json
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = styles.jsonNumber;
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = styles.jsonKey;
          } else {
            cls = styles.jsonString;
          }
        } else if (/true|false/.test(match)) {
          cls = styles.jsonBoolean;
        } else if (/null/.test(match)) {
          cls = styles.jsonNull;
        }
        return `<span class="${cls}">${match}</span>`;
      });
  };

  return (
    <div className={styles.jsonEditor}>
      <h1 className={styles.title}>JSON 编辑器</h1>
      
      <div className={styles.statusBar}>
        {error ? (
          <div className={styles.errorStatus}>
            <span className={styles.errorIcon}>⚠️</span> {error}
          </div>
        ) : (
          <div className={styles.statusMessage}>
            {isDirty ? (
              <span className={styles.unsavedChanges}>未保存的更改</span>
            ) : (
              <span className={styles.savedStatus}>已保存</span>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.controls}>
        <button 
          onClick={() => setViewMode('code')} 
          className={`${styles.controlBtn} ${viewMode === 'code' ? styles.active : ''}`}
        >
          代码视图
        </button>
        <button 
          onClick={() => setViewMode('tree')} 
          className={`${styles.controlBtn} ${viewMode === 'tree' ? styles.active : ''}`}
        >
          树形视图
        </button>
        <button onClick={formatJson} className={styles.controlBtn}>格式化</button>
        <button onClick={compressJson} className={styles.controlBtn}>压缩</button>
        <button onClick={copyToClipboard} className={styles.controlBtn}>复制</button>
        
        <div className={styles.spacer}></div>
        
        <button 
          onClick={handleReset} 
          className={`${styles.controlBtn} ${styles.resetBtn}`}
          disabled={!isDirty}
        >
          重置
        </button>
        <button 
          onClick={handleSave} 
          className={`${styles.controlBtn} ${styles.saveBtn}`}
          disabled={!isDirty || !!error}
        >
          保存
        </button>
      </div>

      {viewMode === 'code' ? (
        <div className={styles.codeEditor}>
          <textarea
            ref={textareaRef}
            value={jsonInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className={styles.textArea}
            placeholder="在此输入JSON数据..."
          />
          <div 
            className={styles.highlightedJson}
            dangerouslySetInnerHTML={{ __html: highlightJson(jsonInput) }}
          />
        </div>
      ) : (
        <div className={styles.treeView}>
          {jsonTree.length > 0 ? (
            jsonTree.map(renderTreeNode)
          ) : (
            <div className={styles.emptyState}>
              {error ? '无效的JSON' : '请输入有效的JSON数据'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

JsonEditor.defaultProps = {
  initialJson: '{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false,\n  "address": {\n    "street": "123 Main St",\n    "city": "Anytown"\n  },\n  "hobbies": ["reading", "gaming", "coding"]\n}',
  onSave: (json) => console.log('保存的JSON:', json),
};

export default JsonEditor;