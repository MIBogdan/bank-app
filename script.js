'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

// Functions

const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', function () {
  const clientCoordinates = section1.getBoundingClientRect();

  window.scrollTo({
    top: clientCoordinates.top + window.pageXOffset,
    left: clientCoordinates.left + window.pageYOffset,
    behavior: 'smooth',
  });
});

////////////////////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})

//   })
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

////////////////////////// IMPORTANT (add the callback on the parent and give it to the
// element that needs it, DO NOT ADD THE CALLBACK ON EVERY ELEMENT BECAUSE IF THERE ARE FOR EXAMPLE
// 1000 ELEMENTS WITH THE CLASS as above .nav__link THEN IT WILL ADD THAT CALLBACK TO ALL OF THEM
// IT IS BETTER TO ADD THE CALLBACK ONLY TO THE ONE THAT NEEDS IT WHEN IT NEEDS IT SO BECAUSE OF THIS
// WE ADD THE CALLBACK ON THE PARENT AND THEN THE PARENT WILL GIVE IT THROUGH THE MATCHING STRATEGT
// TO THE ELEMENT THAT NEEDS IT.)
// ///////EVENT DELEGATION
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ////////////////////////// Tabbed component

// AGAIN EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove all active tabs before inserting one
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  // Add active tab to the clicked element
  clicked.classList.add('operations__tab--active');

  // Remove all active content classes
  tabsContent.forEach(tab => {
    tab.classList.remove('operations__content--active');
  });

  // Insert new active class on the content from the button that was clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation (event DELEGATION)

// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//

//     siblings.forEach(el => {
//       if (el !== link) {
//         return (el.style.opacity = opacity);
//       }
//       // logo.style.opacity = opacity;
//     });
//   }
// };

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

const hovered = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const hoveredLink = e.target;
    const siblingsToFade = hoveredLink
      .closest('.nav__links')
      .querySelectorAll('.nav__link');

    siblingsToFade.forEach((sibling, i) => {
      if (sibling !== hoveredLink) {
        sibling.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  hovered(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  hovered(e, 1);
});

// ////////////////////////// Sticky navigation
// //////This way is bad because the scroll even triggers on each scroll and it will affect performance very bad

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', (e) => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

// ////// The best way to use which doesn't affect performance
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       nav.classList.add('sticky');
//     } else {
//       nav.classList.remove('sticky');
//     }
//   })

// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1)

// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect();

// const stickyNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight.height}px`,
// });
// headerObserver.observe(header);

const navHeight = nav.getBoundingClientRect().height;

const observer = new IntersectionObserver(
  function (e) {
    const [entry] = e;
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
const header = document.querySelector('.header');
observer.observe(header);
// Reveal sections

// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   entries.forEach(entry => {
//     if (!entry.isIntersecting) return;

//     entry.target.classList.remove('section--hidden');
//     observer.unobserve(entry.target);
//   });
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(
  function (e, observer) {
    e.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
      } else {
        return;
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// ////////////////////////// Lazy loading images
// (users with fast internet won't see the effects but it's best
// for performance since we load a very bad pixelated image whilst we load the original ones in the
// background and then as they're loaded we show them)

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// ////////////////////////// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.3) translateX(-150%)';
  // slider.style.overflow = 'visible';

  // slides.forEach((slide, i) => {
  //   return (slide.style.transform = `translateX(${i * 100}%)`);
  // });

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };
  createDots();

  slides.forEach((slide, i) => {
    if (curSlide === 0) {
      if (i !== curSlide) {
        slide.style.opacity = 0;
        setTimeout(() => {
          slide.style.opacity = 1;
        }, 600);
      }
    }
  });

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((slider, i) => {
      slider.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      return nextSlide();
    } else if (e.key === 'ArrowLeft') {
      return prevSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
// -100%, 0%, 100%, 200%

///////////////////////////////////////
// DOM TRAVERSING

// const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'black';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)'
//   }
// })

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

// Selecting elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

////////////////////////////////////////////////////
// Creating and inserting elements

// ////// Creating
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// // ////// Inserting
// // message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML = `We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'>Got it!</button>`;
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true))
// // header.before(message)
// // header.after(message)

// // Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   // ////// Old way
//   // message.parentElement.removeChild(message);

//   // ////// New way
//   message.remove();
// });

// ////// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// console.log(message.style.height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// console.log(document.documentElement.style);

// ////// Attributes
// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j'); // Add class
// logo.classList.remove('c', 'j'); // Remove class
// logo.classList.toggle('c'); // Toggle class
// logo.classList.contains('c'); // Contains class

// ////////////////////////////////////////////////////
// // CALCULATING SCROLL OFFSETS

// const h1 = document.querySelector('h1');
// const alertH1 = e => {
//   alert('addEventListener: Great! You are reading the heading');
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// // h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000)

// // rgb (255, 255, 255)
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// }

// // BUBBLING EFFECT

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor()
//   console.log('LINK', e.target, e.currentTarget);

//   // Stop propagation
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })
