// 导航栏滚动效果
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 控制滚动到顶部按钮显示
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    }
});

// 添加滚动到顶部按钮功能
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '30px';
scrollToTopBtn.style.right = '30px';
scrollToTopBtn.style.width = '50px';
scrollToTopBtn.style.height = '50px';
scrollToTopBtn.style.borderRadius = '50%';
scrollToTopBtn.style.background = 'linear-gradient(120deg, #6200ee, #03dac6)';
scrollToTopBtn.style.color = 'white';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.cursor = 'pointer';
scrollToTopBtn.style.opacity = '0';
scrollToTopBtn.style.transition = 'opacity 0.3s, background 0.2s';
scrollToTopBtn.style.zIndex = '1000';
scrollToTopBtn.style.fontSize = '1.6rem';
scrollToTopBtn.style.display = 'flex';
scrollToTopBtn.style.alignItems = 'center';
scrollToTopBtn.style.justifyContent = 'center';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // 关闭移动菜单（如果打开）
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// 图片查看器功能
const galleryItems = document.querySelectorAll('.gallery-item');
const imageViewer = document.querySelector('.image-viewer');
const viewerContent = document.querySelector('.viewer-content');
const closeViewer = document.querySelector('.close-viewer');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('.gallery-img');
        // 支持img和div两种情况
        let imgUrl = img.dataset.imgUrl || img.src || '';
        if (imgUrl) {
            viewerContent.src = imgUrl;
        }
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 添加作品卡片悬停动画效果
galleryItems.forEach(item => {
    const imgContainer = item.querySelector('.gallery-img-container');
    const overlay = item.querySelector('.gallery-overlay');
    const detailsBtn = item.querySelector('.view-details');
    const imgPlaceholder = item.querySelector('.gallery-img');

    item.addEventListener('mouseenter', function () {
        imgContainer.style.transform = 'translateY(-10px)';
        imgContainer.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function () {
        imgContainer.style.transform = 'translateY(0)';
    });

    // 如果有详情按钮，添加点击事件
    if (detailsBtn) {
        detailsBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // 防止触发卡片点击事件
            // 直接触发大图查看
            let imgUrl = imgPlaceholder.dataset.imgUrl || imgPlaceholder.src || '';
            if (imgUrl) {
                viewerContent.src = imgUrl;
            }
            imageViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

closeViewer.addEventListener('click', function () {
    imageViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
});

imageViewer.addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// 滚动显示动画
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// 为导航链接添加活动状态
const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// 初始化活动导航链接
updateActiveNavLink();