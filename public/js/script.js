//Script for header
const pageHeader = document.querySelector('.bkgd');
const animatedUl = pageHeader.querySelector('header');
const moveHeader = 'move-header';
let targetScroll = window.innerHeight - pageHeader.offsetHeight;

window.addEventListener('scroll', () => {
  const scrollY = this.pageYOffset;

  if (scrollY > targetScroll) {
    animatedUl.classList.add(moveHeader);
  } else {
    animatedUl.classList.remove(moveHeader);
  }
});

window.addEventListener('resize', () => {
  targetScroll = window.innerHeight - pageHeader.offsetHeight;
});

//Script for sliding images in body
const sliderImages = document.querySelectorAll('.slide-in');

const debounce = (func, wait = 20, immediate = true) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const checkSlide = (e) => {
  sliderImages.forEach((sliderImage) => {
    // third through the image
    const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 3;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', debounce(checkSlide));

//Script for Read more... buttons

document.addEventListener('click', (e) => {
  e.preventDefault();

  const concentrationContent = document.querySelector('#concentrationContent');
  const saltyContent = document.querySelector('#saltyContent');
  const workContent = document.querySelector('#workContent');

  console.log(e.target.id);
  if (e.target.id === 'concentration') {
    slideToggle(concentrationContent);
  } else if (e.target.id === 'salty') {
    slideToggle(saltyContent);
  } else if (e.target.id === 'work') {
    slideToggle(workContent);
  } else {
    return;
  }
});

const slideToggle = (container, idContainer) => {
  if (!container.classList.contains('active')) {
    container.classList.add('active');
    container.style.height = 'auto';

    let height = container.clientHeight + 'px';

    container.style.height = '0px';

    setTimeout(function () {
      container.style.height = height;
      container.classList.add('animate__animated', 'animate__fadeIn');
    }, 0);
  } else {
    container.style.height = '0px';

    container.addEventListener(
      'transitionend',
      function () {
        container.classList.remove('active');
      },
      {
        once: true,
      }
    );
  }
};
