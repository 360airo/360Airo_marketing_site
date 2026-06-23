(() => {
      const currentView = "dashboard";
      const currentSection = "overview";
      const lockCurrentPage = () => {
        document.querySelectorAll("[data-view]").forEach((section) => {
          section.hidden = section.dataset.view !== currentView;
        });
        document.querySelectorAll("[data-section-tabs]").forEach((tabs) => {
          tabs.hidden = tabs.dataset.sectionTabs !== currentSection;
        });
        document.querySelectorAll("[data-section-target]").forEach((control) => {
          control.classList.toggle("active", control.dataset.sectionTarget === currentSection);
          control.setAttribute("aria-disabled", "true");
          control.dataset.lockedStandalone = "true";
        });
        document.querySelectorAll("[data-target-view]").forEach((control) => {
          control.classList.toggle("active", control.dataset.targetView === currentView);
          control.setAttribute("aria-disabled", "true");
          control.dataset.lockedStandalone = "true";
        });
        if (location.hash !== "#" + currentView) {
          history.replaceState(null, "", "#" + currentView);
        }
      };

      document.addEventListener("click", (event) => {
        const lockedControl = event.target.closest("[data-section-target], [data-target-view]");
        if (!lockedControl) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        lockCurrentPage();
      }, true);

      window.addEventListener("hashchange", lockCurrentPage);
      lockCurrentPage();
    })();