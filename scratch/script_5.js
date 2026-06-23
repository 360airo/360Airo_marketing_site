const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebarResizer = document.getElementById('sidebarResizer');
    let isResizing = false;

    const setSidebarCollapsed = (collapsed) => {
      document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
      sidebarCollapse.setAttribute('aria-expanded', String(!collapsed));
      sidebarCollapse.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
      sidebarCollapse.dataset.tooltip = collapsed ? 'Open sidebar' : 'Close sidebar';
      if (collapsed) {
        document.documentElement.style.removeProperty('--sidebar');
      }
    };

    sidebarCollapse.addEventListener('click', () => {
      setSidebarCollapsed(!document.documentElement.classList.contains('sidebar-collapsed'));
    });

    sidebarResizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      setSidebarCollapsed(false);
      document.body.style.userSelect = 'none';
      sidebarResizer.classList.add('is-resizing');
      document.documentElement.classList.add('is-resizing');
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      if (newWidth < 220) newWidth = 220; // Minimum width
      if (newWidth > 600) newWidth = 600; // Maximum width
      document.documentElement.style.setProperty('--sidebar', newWidth + 'px');
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.userSelect = '';
        sidebarResizer.classList.remove('is-resizing');
        document.documentElement.classList.remove('is-resizing');
      }
    });