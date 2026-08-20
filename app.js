const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const message = document.querySelector('#no-message');
const questionScreen = document.querySelector('#love-question');
const giftScreen = document.querySelector('#gifts');
const modal = document.querySelector('#modal');
const giftContents = document.querySelectorAll('.gift-content');

const noMessages = [
  'Are you sure? 🥺',
  'Try again, my love…',
  'That button looks a little suspicious!',
  'Please choose carefully… ♡',
  'The Yes button is waiting for you!',
  'Okay, you are being silly now!'
];
let noCount = 0;

noButton.addEventListener('click', () => {
  noCount += 1;
  message.textContent = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
  const noScale = Math.max(0.18, 1 - noCount * 0.16);
  const yesScale = 1 + noCount * 0.12;
  noButton.style.transform = `scale(${noScale})`;
  yesButton.style.transform = `scale(${yesScale})`;
  if (noCount >= 6) {
    noButton.style.opacity = '0';
    noButton.style.pointerEvents = 'none';
    setTimeout(() => noButton.classList.add('hidden'), 250);
  }
});

yesButton.addEventListener('click', () => {
  questionScreen.classList.add('hidden');
  giftScreen.classList.remove('hidden');
  burstHearts();
});

document.querySelectorAll('.gift-card').forEach((card) => {
  card.addEventListener('click', () => {
    giftContents.forEach((content) => content.classList.add('hidden'));
    document.querySelector(`#${card.dataset.gift}-content`).classList.remove('hidden');
    modal.classList.remove('hidden');
  });
});

document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
function closeModal() { modal.classList.add('hidden'); }

function burstHearts() {
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = i % 3 === 0 ? '✦' : '♥';
    heart.style.cssText = `position:fixed;z-index:20;left:${45 + Math.random() * 10}%;top:${45 + Math.random() * 10}%;color:${i % 2 ? '#ff7891' : '#f5b84b'};font-size:${16 + Math.random() * 20}px;pointer-events:none;transition:transform 1.1s ease-out,opacity 1.1s ease-out;`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => { heart.style.transform = `translate(${(Math.random() - .5) * 600}px, ${(Math.random() - .5) * 550}px) rotate(${Math.random() * 360}deg)`; heart.style.opacity = '0'; });
    setTimeout(() => heart.remove(), 1200);
  }
}
