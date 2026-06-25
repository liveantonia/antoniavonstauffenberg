/* =====================================================
   main.js — Theme toggle & navigation interactions
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Theme ---------- */
  const STORAGE_KEY = 'avs-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.querySelector('.toggle-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ---------- Mobile Nav ---------- */
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbar-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link ---------- */
  function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-links a').forEach(a => {
      const href = a.getAttribute('href').split('/').pop();
      if (href === path) {
        a.classList.add('active');
      }
    });
  }

  /* ---------- CV — PDF upload & preview ---------- */
  function initCVPage() {
    const uploadInput = document.getElementById('cv-upload');
    const pdfFrame = document.getElementById('pdf-frame');
    const uploadArea = document.getElementById('upload-area');
    const viewerSection = document.getElementById('viewer-section');
    const downloadBtn = document.getElementById('download-btn');

    if (!uploadInput) return;

    uploadInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file || file.type !== 'application/pdf') return;

      const url = URL.createObjectURL(file);
      pdfFrame.src = url;
      uploadArea.style.display = 'none';
      viewerSection.style.display = 'block';

      if (downloadBtn) {
        downloadBtn.href = url;
        downloadBtn.download = file.name;
      }
    });

    // Drag and drop support
    if (uploadArea) {
      uploadArea.addEventListener('dragover', e => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--hot-pink)';
      });
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
      });
      uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
          uploadInput.files = e.dataTransfer.files;
          uploadInput.dispatchEvent(new Event('change'));
        }
      });
    }
  }

  /* ---------- Publications filter ---------- */
  function initPublicationsPage() {
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.pub-item').forEach(item => {
          if (filter === 'all' || item.dataset.type === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        // Hide empty year groups
        document.querySelectorAll('.pub-year-group').forEach(group => {
          const visible = group.querySelectorAll('.pub-item:not([style*="display: none"])').length;
          group.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Re-apply theme to sync the toggle button icon once the DOM is ready
    applyTheme(getPreferredTheme());

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    initMobileNav();
    setActiveLink();
    initCVPage();
    initPublicationsPage();
  });
})();
