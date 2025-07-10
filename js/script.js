/* 导航栏滚动透明度变化 */
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 24) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* 深色模式切换（点击按钮切换类名，通过CSS变量切换配色） */
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
function setDarkMode(on) {
    document.body.classList.toggle('darkmode', on);
    darkModeIcon.src = on ? 'images/icons/sun.svg' : 'images/icons/moon.svg';
    darkModeIcon.alt = on ? '浅色模式' : '深色模式';
    localStorage.setItem('darkmode', on ? '1' : '0');
}
// 初始化深色模式
if (localStorage.getItem('darkmode') === '1') setDarkMode(true);
darkModeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('darkmode'));
});

/* hero区图片3秒一次轻微缩放（scale:1.02→1，循环动画） */
const heroImg = document.getElementById('heroImg');
let scaleUp = true;
setInterval(() => {
    if (heroImg) {
        heroImg.style.transform = scaleUp ? 'scale(1.02)' : 'scale(1)';
        scaleUp = !scaleUp;
    }
}, 3000);

/* 移动端汉堡菜单展开/关闭 */
const navHamburger = document.getElementById('navHamburger');
const navMobileOverlay = document.getElementById('navMobileOverlay');
const navMobileClose = document.getElementById('navMobileClose');
if (navHamburger && navMobileOverlay && navMobileClose) {
    navHamburger.addEventListener('click', () => {
        navMobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    navMobileClose.addEventListener('click', () => {
        navMobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    // 点击菜单项关闭
    navMobileOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* 页面特效：各区块滚动时淡入 */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

/* 回到顶部按钮 */
const backToTopBtn = document.getElementById('backToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* 表单验证 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        this.querySelectorAll('input, textarea').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        if (isValid) {
            // 提交表单或其他操作
            alert('表单已提交！');
        }
    });
}

/* 图片懒加载 */
const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, { rootMargin: '0px 0px 200px 0px' });

lazyImages.forEach(image => {
    imageObserver.observe(image);
});
