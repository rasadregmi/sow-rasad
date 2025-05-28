import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import "../../styles/pricelist.css";
import "../../styles/tablet-view.css";
import useToast from "../Toast.js";

export default function PricelistTable({filteredData, isMobile, isTablet, isPhoneLandscape}) {
  const [editingCell, setEditingCell] = useState({ rowIndex: null, field: null });
  const [editValue, setEditValue] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'articleNo', direction: 'ascending' });
  const toast = useToast();
  
  const handleCellClick = (rowIndex, field, value) => {
    setEditingCell({ rowIndex, field });
    setEditValue(value ? value.toString() : '');
  };
  
  const handleCellChange = (e) => {
    setEditValue(e.target.value);
  };
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
    if (!a[sortConfig.key]) return 1;
    if (!b[sortConfig.key]) return -1;
    
    const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
    const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  const handleSaveEdit = async (product, field) => {
    const newValue = field === 'inPrice' || field === 'price' || field === 'inStock' 
      ? parseInt(editValue) 
      : editValue;
      
    if (product[field] === newValue) {
      setEditingCell({ rowIndex: null, field: null });
      return;
    }
    
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/products/${product.id}`,
        { [field]: newValue }
      );
      
      toast.success(
        "Product updated",
        `${field} has been updated successfully.`
      );
      
      setEditingCell({ rowIndex: null, field: null });
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(
        "Update failed",
        error.response?.data?.error || "Failed to update product"
      );
    }
  };
  
  const handleKeyDown = (e, product, field) => {
    if (e.key === 'Enter') {
      handleSaveEdit(product, field);
    } else if (e.key === 'Escape') {
      setEditingCell({ rowIndex: null, field: null });
    }
  };

  if (isTablet) {
    return (
      <div className="pricelist-table-container tablet-view">
        <div className="responsive-headers">
          <div className="header-arrow"></div>
          <div className="header-article">Article No.</div>
          <div className="header-product">Product/Service</div>
          <div className="header-price">Price</div>
          <div className="header-instock">In Stock</div>
          <div className="header-unit">Unit</div>
          <div className="header-actions"></div>
        </div>
        <div className="responsive-table">
          {sortedData.map((product, index) => (
            <div key={index} className="responsive-row">
              <div className="row-arrow">➔</div>
              <div className="article-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'articleNo', product.articleNo)}>
                  {editingCell.rowIndex === index && editingCell.field === 'articleNo' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'articleNo')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'articleNo')}
                    />
                  ) : (
                    <span className="article-number">{product.articleNo || "1234567890"}</span>
                  )}
                </div>
              </div>
              <div className="product-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'name', product.name)}>
                  {editingCell.rowIndex === index && editingCell.field === 'name' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'name')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'name')}
                    />
                  ) : (
                    <span className="product-name">{product.name || "This is a test product with fifty characters this!"}</span>
                  )}
                </div>
              </div>
              <div className="price-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'price', product.price)}>
                  {editingCell.rowIndex === index && editingCell.field === 'price' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'price')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'price')}
                      type="number"
                    />
                  ) : (
                    <span className="product-price">{product.price || "1500800"}</span>
                  )}
                </div>
              </div>
              <div className="instock-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'inStock', product.inStock)}>
                  {editingCell.rowIndex === index && editingCell.field === 'inStock' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'inStock')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'inStock')}
                      type="number"
                    />
                  ) : (
                    <span className="product-instock">{product.inStock || "1500800"}</span>
                  )}
                </div>
              </div>
              <div className="unit-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'unit', product.unit)}>
                  {editingCell.rowIndex === index && editingCell.field === 'unit' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'unit')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'unit')}
                    />
                  ) : (
                    <span className="product-unit">{product.unit || "kilometers/hour"}</span>
                  )}
                </div>
              </div>
              <div className="action-column">
                <div className="action-cell">
                  <FiMoreHorizontal size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
      
  if (isPhoneLandscape) {
    return (
      <div className="pricelist-table-container phone-landscape-view">
        <div className="responsive-headers">
          <div className="header-product">Product/Service</div>
          <div className="header-price">Price</div>
          <div className="header-actions"></div>
        </div>
        
        <div className="responsive-table">
          {sortedData.map((product, index) => (
            <div key={index} className="responsive-row">
              <div className="row-arrow">➔</div>
              <div className="product-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'name', product.name)}>
                  {editingCell.rowIndex === index && editingCell.field === 'name' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'name')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'name')}
                    />
                  ) : (
                    <span className="product-name">{product.name || "This is a test product with fifty characters this!"}</span>
                  )}
                </div>
              </div>
              <div className="price-column">
                <div className="editable-cell" onClick={() => handleCellClick(index, 'price', product.price)}>
                  {editingCell.rowIndex === index && editingCell.field === 'price' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'price')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'price')}
                      type="number"
                    />
                  ) : (
                    <span className="product-price">{product.price || "1500800"}</span>
                  )}
                </div>
              </div>
              <div className="action-column">
                <div className="action-cell">
                  <FiMoreHorizontal color="#63e4f0" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (isMobile) {
    return (
      <div className="pricelist-mobile-container">
        <div className="mobile-column-headers">
          <div className="mobile-column-header">Product/Service</div>
          <div className="mobile-column-header">Price</div>
          <div className="mobile-column-header-empty"></div>
        </div>
        
        {sortedData.map((product, index) => (
          <div key={index} className="pricelist-mobile-card">
            <div className="mobile-card-row">
              <div className="mobile-indicator">➔</div>
              <div className="mobile-field-section">
                <div 
                  className="mobile-editable-field" 
                  onClick={() => handleCellClick(index, 'name', product.name)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'name' ? (
                    <input
                      className="mobile-editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'name')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'name')}
                    />
                  ) : (
                    <span className="mobile-product-name">{product.name}</span>
                  )}
                </div>
              </div>
              
              <div className="mobile-field-section mobile-price-section">
                <div 
                  className="mobile-editable-field" 
                  onClick={() => handleCellClick(index, 'price', product.price)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'price' ? (
                    <input
                      className="mobile-editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'price')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'price')}
                      type="number"
                    />
                  ) : (
                    <span className="mobile-price">{product.price}</span>
                  )}
                </div>
              </div>

              <div className="mobile-action">
                <FiMoreHorizontal color="#63e4f0" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pricelist-table-container">
      <table className="pricelist-table">
        <thead>
          <tr>
            <th className="pricelist-table-header" style={{ width: '30px', minWidth: '30px' }}></th>
            <th className="pricelist-table-header" onClick={() => handleSort('articleNo')}>
              <div className="header-with-icon">
                Article No. <FaArrowDown size={12} color="#63e4f0" />
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('name')}>
              <div className="header-with-icon">
                Product/Service {sortConfig.key === 'name' ? 
                (sortConfig.direction === 'ascending' ? <FaArrowUp size={12} color="#63e4f0" /> : <FaArrowDown size={12} color="#63e4f0" />) : 
                <FaArrowDown size={12} color="#63e4f0" />}
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('inPrice')}>
              <div className="header-with-icon">
                In Price
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('price')}>
              <div className="header-with-icon">
                Price
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('unit')}>
              <div className="header-with-icon">
                Unit
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('inStock')}>
              <div className="header-with-icon">
                In Stock
              </div>
            </th>
            <th className="pricelist-table-header" onClick={() => handleSort('description')}>
              <div className="header-with-icon">
                Description
              </div>
            </th>
            <th className="pricelist-table-header"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((product, index) => (
            <tr key={index} className="pricelist-table-row">
              <td className="pricelist-table-cell row-indicator">
                <span className="table-row-arrow">➔</span>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'articleNo', product.articleNo)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'articleNo' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'articleNo')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'articleNo')}
                    />
                  ) : (
                    product.articleNo
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'name', product.name)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'name' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'name')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'name')}
                    />
                  ) : (
                    product.name
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'inPrice', product.inPrice)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'inPrice' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'inPrice')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'inPrice')}
                      type="number"
                    />
                  ) : (
                    product.inPrice
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'price', product.price)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'price' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'price')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'price')}
                      type="number"
                    />
                  ) : (
                    product.price
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'unit', product.unit)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'unit' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'unit')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'unit')}
                    />
                  ) : (
                    product.unit
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'inStock', product.inStock)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'inStock' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'inStock')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'inStock')}
                      type="number"
                    />
                  ) : (
                    product.inStock
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div
                  className="editable-cell"
                  onClick={() => handleCellClick(index, 'description', product.description)}
                >
                  {editingCell.rowIndex === index && editingCell.field === 'description' ? (
                    <input
                      className="editable-input"
                      autoFocus
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={() => handleSaveEdit(product, 'description')}
                      onKeyDown={(e) => handleKeyDown(e, product, 'description')}
                    />
                  ) : (
                    product.description
                  )}
                </div>
              </td>
              <td className="pricelist-table-cell">
                <div className="action-cell">
                  <FiMoreHorizontal color="#63e4f0" size={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}