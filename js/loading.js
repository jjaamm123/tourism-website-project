
document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.getElementById('loading-overlay');
  const body = document.body;
  

  setTimeout(function() {
    loadingOverlay.classList.add('fade-out');
    body.classList.add('content-loaded');
    

    setTimeout(function() {
      loadingOverlay.style.display = 'none';
    }, 300);
  }, 1500); 
  

  window.addEventListener('load', function() {

    setTimeout(function() {
      if (!loadingOverlay.classList.contains('fade-out')) {
        loadingOverlay.classList.add('fade-out');
        body.classList.add('content-loaded');
        setTimeout(function() {
          loadingOverlay.style.display = 'none';
        }, 300);
      }
    }, 2000);
  });
});