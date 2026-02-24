import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private getContainer(): HTMLElement {
    let container = document.getElementById('toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      // Added z-[9999] to ensure it stays above modals/splash screens
      container.className = 'toast toast-bottom toast-end z-[9999] p-4';
      document.body.appendChild(container);
    }

    return container;
  }

  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const toastContainer = this.getContainer();

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg', 'mb-2', 'flex', 'justify-between');

    // Safety check: if message is an object (common in Http errors), stringify it
    const displayMessage = typeof message === 'object' ? JSON.stringify(message) : message;

    toast.innerHTML = `
      <span>${displayMessage}</span>
      <button class="ml-4 btn btn-sm btn-ghost text-current">✕</button>
    `;

    // Manual removal on click
    const closeBtn = toast.querySelector('button');
    closeBtn?.addEventListener('click', () => {
      toast.remove();
    });

    toastContainer.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}