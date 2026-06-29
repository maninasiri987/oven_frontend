(function () {
  var storageKey = 'oven-theme';
  var html = document.documentElement;

  function getPreferred() {
    var stored = localStorage.getItem(storageKey);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  apply(getPreferred());

  window.toggleTheme = function () {
    var current = html.classList.contains('dark') ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, next);
    apply(next);
    updateIcons(next);
  };

  window.updateIcons = function (theme) {
    var darkIcons = document.querySelectorAll('.dark-icon');
    var lightIcons = document.querySelectorAll('.light-icon');
    if (theme === 'dark') {
      darkIcons.forEach(function (el) { el.classList.remove('hidden'); });
      lightIcons.forEach(function (el) { el.classList.add('hidden'); });
    } else {
      darkIcons.forEach(function (el) { el.classList.add('hidden'); });
      lightIcons.forEach(function (el) { el.classList.remove('hidden'); });
    }
  };

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(storageKey)) {
      apply(e.matches ? 'dark' : 'light');
      updateIcons(e.matches ? 'dark' : 'light');
    }
  });
})();
