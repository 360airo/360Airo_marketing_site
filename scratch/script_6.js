// Moved modal close event outside
    document.addEventListener('DOMContentLoaded', () => {
      const closeModalBtn = document.getElementById('schedDateModalClose');
      const modalOverlay = document.getElementById('schedDateModal');
      
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
          modalOverlay.classList.remove('active');
        });
      }
      
      if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
          }
        });
      }
    });