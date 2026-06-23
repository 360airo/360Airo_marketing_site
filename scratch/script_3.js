// Profile Dropdown Toggle
    const profileBtn = document.getElementById('profileToggle');
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = profileBtn.getAttribute('aria-expanded') === 'true';
      profileBtn.setAttribute('aria-expanded', !isExpanded);
    });
    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target)) {
        profileBtn.setAttribute('aria-expanded', 'false');
      }
    });