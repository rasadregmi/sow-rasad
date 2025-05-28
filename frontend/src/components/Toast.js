import { useState, useEffect } from 'react';
import '../styles/toast.css';

let toastCounter = 0;

const toasts = {
  toastItems: [],
  listeners: [],
  
  addToast: function(toast) {
    const id = toastCounter++;
    const toastWithId = { ...toast, id };
    this.toastItems.push(toastWithId);
    this.notifyListeners();
    
    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration || 3000);
    
    return id;
  },
  
  removeToast: function(id) {
    this.toastItems = this.toastItems.filter(toast => toast.id !== id);
    this.notifyListeners();
  },
  
  subscribe: function(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  
  notifyListeners: function() {
    this.listeners.forEach(listener => listener([...this.toastItems]));
  }
};

export function ToastContainer() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const unsubscribe = toasts.subscribe(newItems => {
      setItems(newItems);
    });
    
    return unsubscribe;
  }, []);
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="toast-container">
      {items.map(toast => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.status || 'info'}`}
        >
          {toast.title && <div className="toast-title">{toast.title}</div>}
          {toast.description && (
            <div className="toast-description">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  return {
    show: (options) => toasts.addToast(options),
    success: (title, description, duration = 3000) => 
      toasts.addToast({ title, description, status: 'success', duration }),
    error: (title, description, duration = 3000) => 
      toasts.addToast({ title, description, status: 'error', duration }),
    warning: (title, description, duration = 3000) => 
      toasts.addToast({ title, description, status: 'warning', duration }),
    info: (title, description, duration = 3000) => 
      toasts.addToast({ title, description, status: 'info', duration }),
    close: (id) => toasts.removeToast(id)
  };
}

export default useToast;