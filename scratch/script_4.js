/* ── FAB: click to toggle, click-outside to close ────────── */
    (function() {
      const fabWrapper = document.querySelector('.sched-fab-wrapper');
      const fabBtn     = document.getElementById('schedFabBtn');
      if (!fabBtn || !fabWrapper) return;

      let fabOpen = false;

      const openFAB = () => {
        fabOpen = true;
        fabWrapper.classList.add('fab-open');
      };
      const closeFAB = () => {
        fabOpen = false;
        fabWrapper.classList.remove('fab-open');
      };

      fabBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fabOpen ? closeFAB() : openFAB();
      });

      document.addEventListener('click', (e) => {
        if (fabOpen && !fabWrapper.contains(e.target)) {
          closeFAB();
        }
      });
    })();