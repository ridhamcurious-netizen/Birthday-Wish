document.addEventListener('DOMContentLoaded', () => {
  const candle = document.getElementById('candle');
  const flame = document.getElementById('flame');
  const puff = document.getElementById('puff');
  const actor1 = document.getElementById('actor');
  const actor2 = document.getElementById('actor2');
  const actor3 = document.getElementById('actor3');
  const balloonsContainer = document.getElementById('balloons');
  const music = document.getElementById('bg-music');
  const cake = document.getElementById('cake');
  const nextText = document.getElementById('next-text'); // text for going to next page
  const optionCards = document.querySelectorAll('.option-card');

  let clickCount = 0;

  document.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
      // Play music
      if (music.paused) {
        music.play().catch(err => console.log('Music blocked:', err));
      }

      // Hide flame
      flame.style.display = 'none';

      // Puff animation
      const rect = flame.getBoundingClientRect();
      puff.style.left = rect.left + rect.width / 2 + 'px';
      puff.style.top = rect.top + window.scrollY + 'px';
      puff.style.opacity = '1';
      puff.style.transform = 'translate(-50%,0) scale(0.6)';
      puff.style.transition = 'transform .8s ease, opacity .8s ease, top .8s ease';
      requestAnimationFrame(() => {
        puff.style.transform = 'translate(-50%,-50px) scale(1.4)';
        puff.style.opacity = '0';
      });
      setTimeout(() => {
        puff.style.transition = '';
        puff.style.opacity = '0';
      }, 900);

      // Balloons
      createBalloons();

      // Fade cake and show first actor
      setTimeout(() => {
        cake.style.opacity = '0';
        actor1.style.opacity = '1';
        actor1.style.transform = 'translateX(-50%) translateY(0) scale(1)';
      }, 1500);
    } 
    else if (clickCount === 2) {
      // Show second actor, hide first
      actor1.style.opacity = '0';
      setTimeout(() => {
        actor2.style.opacity = '1';
        actor2.style.transform = 'translateX(-50%) translateY(0) scale(1)';
      }, 800);
    } 
    else if (clickCount === 3) {
      // Show third actor, hide second
      actor2.style.opacity = '0';
      setTimeout(() => {
        actor3.style.opacity = '1';
        actor3.style.transform = 'translateX(-50%) translateY(0) scale(1)';

        // Show clickable text below third actor
        nextText.classList.add('show');
        nextText.style.cursor = 'pointer';
        nextText.addEventListener('click', () => {
          window.location.href = 'messages.html';
        });

        // Show options below the actor (Messages, Videos, etc.)
        optionCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('show'); // slide-up animation
          }, index * 200);

          // Link Messages option
          if (card.id === 'messages') {
            card.addEventListener('click', () => {
              window.location.href = 'messages.html'; // Link to messages page
            });
          }
        });
      }, 800);
    }
  });

  function createBalloons() {
    const colors = ['#FF5C5C', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6EC7'];
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.background = colors[Math.floor(Math.random() * colors.length)];
      b.style.left = Math.random() * 80 + 'vw';
      b.style.animationDuration = (4 + Math.random() * 3) + 's';
      balloonsContainer.appendChild(b);
      setTimeout(() => b.remove(), 8000);
    }
  }
});
