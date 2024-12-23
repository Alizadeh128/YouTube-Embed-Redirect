chrome.storage.local.get(['enabled'], (result) => {
  const toggleButton = document.getElementById('toggleButton');
  const convertButton = document.getElementById('convertButton');

  // تنظیم متن دکمه فعال‌سازی
  if (result.enabled === false) {
    toggleButton.textContent = 'Activate';
  } else {
    toggleButton.textContent = 'Deactivate';
  }

  // تغییر وضعیت فعال/غیرفعال
  toggleButton.addEventListener('click', function () {
    const isEnabled = result.enabled !== false;

    chrome.storage.local.set({ enabled: !isEnabled }, function () {
      toggleButton.textContent = isEnabled ? 'Activate' : 'Deactivate';
    });
  });

  // عملکرد دکمه تبدیل صفحه به Embed
  convertButton.addEventListener('click', function () {
    // بررسی URL صفحه فعلی
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      const url = new URL(activeTab.url);

      if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
        const videoId = url.searchParams.get('v');

        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          chrome.tabs.update(activeTab.id, { url: embedUrl });
        } else {
          alert('No valid YouTube video ID found!');
        }
      } else {
        alert('This is not a YouTube watch page.');
      }
    });
  });
});
