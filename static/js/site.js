(() => {
  const progress = document.querySelector('.scroll-progress span');
  const updateProgress = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${range > 0 ? (scrollY / range) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  }

  const copyButton = document.querySelector('[data-copy]');
  copyButton?.addEventListener('click', async () => {
    const text = document.querySelector('.bibtex-wrap code')?.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = 'Copied';
      setTimeout(() => { copyButton.textContent = 'Copy'; }, 1600);
    } catch {
      copyButton.textContent = 'Select text';
    }
  });
})();
