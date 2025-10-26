export function getInitialThemeScript(storageKey = "vite-ui-theme") {
  const script = `
    (function() {
      try {
        var storageKey = '${storageKey}';
        var theme = localStorage.getItem(storageKey) || 'system';
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var effectiveTheme = theme === 'dark' || (theme === 'system' && systemDark)
          ? 'dark'
          : 'light';
        document.documentElement.classList.add(effectiveTheme);
      } catch (_) {}
    })();
  `;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
