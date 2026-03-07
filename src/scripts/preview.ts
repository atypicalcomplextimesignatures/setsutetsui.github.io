  window.addEventListener('message', (event) => {
    if (event.data.type === 'updateArgamaColor') {
      document.documentElement.style.setProperty('--argama-text-color', event.data.color);
    }
    if (event.data.type === 'updateMagazineBackgroundColor') {
      document.documentElement.style.setProperty('--magazine-background-color', event.data.color);
    }
  });