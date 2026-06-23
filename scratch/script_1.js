if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Global Modal Handlers
    document.addEventListener('click', e => {
      if (e.target.matches('[data-close-sched-modal], .esm-modal-overlay')) {
        document.getElementById('schedDateModal')?.classList.remove('active');
      }
    });