/* 
  * This part is for the mobile NAV section
*/
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuToggle?.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
  });
/*

*/


/* 
  * This part is for the HERO section
*/

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('see-offers-btn');
  if (!btn) return;
  // Remove animation after 3s
  setTimeout(() => {
      btn.classList.remove('animate-[shake_0.8s_ease-in-out_infinite]');
  }, 3000);

  let lastScrollY = window.scrollY;
  let ticking = false;
  let animTimeout = null;

  function replayAnimation() {
      btn.classList.remove('animate-[shake_0.8s_ease-in-out_infinite]');
      // Force reflow
      void btn.offsetWidth;
      btn.classList.add('animate-[shake_0.8s_ease-in-out_infinite]');
      clearTimeout(animTimeout);
      animTimeout = setTimeout(() => {
          btn.classList.remove('animate-[shake_0.8s_ease-in-out_infinite]');
      }, 3000);
  }

  window.addEventListener('scroll', function () {
      if (!ticking) {
          window.requestAnimationFrame(function () {
              // If user scrolled to top (allow a little leeway)
              if (window.scrollY < 20 && lastScrollY >= 20) {
                  replayAnimation();
              }
              lastScrollY = window.scrollY;
              ticking = false;
          });
          ticking = true;
      }
  });
});

/*

*/


/* 
  * This part is for the about section paragraphs
*/
  // Calculate average reading time (words per minute)
  const para1 = `I specialize in writing self-help books for content creators/entrepreneurs to help you write your first book and add the title “Author” to your accomplishments.
  To launch your brand as an author, I recommend starting with discussing ideas, then writing a few paragraphs to identify your writing voice and language style.`;

  const para2 = `I can handle the research, outline, and the formatting. After reading 200+ books on business and personal development.<br>
  All I need is a weekly consulting session to edit and check for final approval. We can start with a chat/call to discuss your ideas and test a few pages.`;

  const avgWPM = 200; // average adult reading speed

  // Helper to animate a paragraph by id and text, returns a promise
  function animateParagraph(paragraphId, text) {
    return new Promise((resolve) => {
      const paragraph = document.getElementById(paragraphId);
      if (!paragraph) return resolve();
      // Replace newlines in the array with '\n' so we can handle them
      const wordsWithBreaks = text.replace(/\n/g, ' \n ').split(/\s+/);
      const totalMs = Math.max(1500, Math.round((wordsWithBreaks.length / avgWPM) * 60 * 1000)); // minimum 1.5s
      let idx = 0;
      function revealWordByWord() {
        if (idx < wordsWithBreaks.length) {
          let word = wordsWithBreaks[idx];
          if (word.includes('\n')) {
            const parts = word.split('\n');
            word = parts[0] + '<br>' + parts[1];
          }
          paragraph.innerHTML += (idx > 0 ? ' ' : '') + word;
          idx++;
          setTimeout(revealWordByWord, totalMs / wordsWithBreaks.length);
        } else {
          resolve();
        }
      }
      revealWordByWord();
    });
  }

  // Animate para1, then para2 after 1s
  animateParagraph('about_para1', para1).then(() => {
    setTimeout(() => {
      animateParagraph('about_para2', para2);
    }, 1000);
  });

/*

*/


 // Show the CTA span with a fade-in and scale animation when #testimonials-2 is in view
document.addEventListener('DOMContentLoaded', function () {
    const cta = document.getElementById('contact-cta-span');
    const section = document.getElementById('testimonials-2');
    if (!cta || !section) return;

    // Intersection Observer to detect when #testimonials-2 is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fade and scale in
                    cta.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                    cta.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
                } else {
                    // Fade and scale out
                    cta.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
                    cta.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                }
            });
        },
        {
            root: null,
            threshold: 0.5 // Trigger when 50% of the section is visible
        }
    );
    observer.observe(section);
});