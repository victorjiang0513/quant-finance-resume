// 量化金融简历 - 交互脚本
// 设计原则：有意义、增强体验的交互效果

document.addEventListener('DOMContentLoaded', function() {
    // 1. 滚动时显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察所有卡片
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // 2. 技能标签点击效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');

            // 添加短暂的高光效果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // 3. 项目卡片悬停效果增强
    const projectCards = document.querySelectorAll('.project-item');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 5px 15px rgba(6, 182, 212, 0.2)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
        });
    });

    // 4. 兴趣图标动画
    const interestIcons = document.querySelectorAll('.interest-icon');
    interestIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // 5. 联系信息悬停效果
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // 6. PDF导出提示
    const pdfLink = document.querySelector('.footer-link[href*="PDF"]');
    if (pdfLink) {
        pdfLink.addEventListener('click', function(e) {
            e.preventDefault();

            // 创建提示模态框
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: var(--color-surface);
                padding: var(--space-xl);
                border-radius: var(--radius-lg);
                max-width: 500px;
                width: 90%;
                border: 1px solid var(--color-primary);
                box-shadow: var(--shadow-card-hover);
            `;

            modalContent.innerHTML = `
                <h3 style="font-family: var(--font-heading); color: var(--color-text); margin-bottom: var(--space-md);">
                    <i class="fas fa-file-pdf" style="color: var(--color-primary);"></i>
                    导出PDF简历
                </h3>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                    要导出PDF版本，请使用浏览器的打印功能：
                </p>
                <ol style="color: var(--color-text-secondary); margin-bottom: var(--space-lg); padding-left: var(--space-lg);">
                    <li style="margin-bottom: var(--space-sm);">按下 <kbd>Ctrl+P</kbd> (Windows) 或 <kbd>Cmd+P</kbd> (Mac)</li>
                    <li style="margin-bottom: var(--space-sm);">在目标打印机中选择"另存为PDF"</li>
                    <li style="margin-bottom: var(--space-sm);">调整页边距为"无"以获得最佳效果</li>
                    <li>点击"保存"生成PDF文件</li>
                </ol>
                <div style="display: flex; gap: var(--space-md); justify-content: flex-end;">
                    <button id="printNow" style="padding: var(--space-sm) var(--space-lg); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-family: var(--font-body);">
                        立即打印
                    </button>
                    <button id="closeModal" style="padding: var(--space-sm) var(--space-lg); background: var(--color-surface-light); color: var(--color-text); border: 1px solid var(--color-border); border-radius: var(--radius-md); cursor: pointer; font-family: var(--font-body);">
                        关闭
                    </button>
                </div>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // 添加模态框样式变量
            modalContent.style.setProperty('--color-surface', getComputedStyle(document.documentElement).getPropertyValue('--color-surface'));
            modalContent.style.setProperty('--color-primary', getComputedStyle(document.documentElement).getPropertyValue('--color-primary'));
            modalContent.style.setProperty('--color-text', getComputedStyle(document.documentElement).getPropertyValue('--color-text'));
            modalContent.style.setProperty('--color-text-secondary', getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary'));
            modalContent.style.setProperty('--color-surface-light', getComputedStyle(document.documentElement).getPropertyValue('--color-surface-light'));
            modalContent.style.setProperty('--color-border', getComputedStyle(document.documentElement).getPropertyValue('--color-border'));
            modalContent.style.setProperty('--shadow-card-hover', getComputedStyle(document.documentElement).getPropertyValue('--shadow-card-hover'));
            modalContent.style.setProperty('--space-sm', getComputedStyle(document.documentElement).getPropertyValue('--space-sm'));
            modalContent.style.setProperty('--space-md', getComputedStyle(document.documentElement).getPropertyValue('--space-md'));
            modalContent.style.setProperty('--space-lg', getComputedStyle(document.documentElement).getPropertyValue('--space-lg'));
            modalContent.style.setProperty('--space-xl', getComputedStyle(document.documentElement).getPropertyValue('--space-xl'));
            modalContent.style.setProperty('--radius-md', getComputedStyle(document.documentElement).getPropertyValue('--radius-md'));
            modalContent.style.setProperty('--radius-lg', getComputedStyle(document.documentElement).getPropertyValue('--radius-lg'));
            modalContent.style.setProperty('--font-heading', getComputedStyle(document.documentElement).getPropertyValue('--font-heading'));
            modalContent.style.setProperty('--font-body', getComputedStyle(document.documentElement).getPropertyValue('--font-body'));

            // 事件监听
            modal.querySelector('#printNow').addEventListener('click', function() {
                window.print();
                document.body.removeChild(modal);
            });

            modal.querySelector('#closeModal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }

    // 7. 页面加载动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 8. 动态更新年份
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // 9. 添加键盘快捷键提示
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P 提示
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            alert('提示：使用浏览器的"另存为PDF"功能导出简历。页边距选择"无"以获得最佳效果。');
            setTimeout(() => window.print(), 100);
        }

        // ESC键关闭模态框
        if (e.key === 'Escape') {
            const modal = document.querySelector('div[style*="position: fixed"]');
            if (modal) {
                document.body.removeChild(modal);
            }
        }
    });

    // 10. 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .skill-tag.active {
            background-color: var(--color-primary) !important;
            color: white !important;
            border-color: var(--color-primary) !important;
            transform: scale(1.05);
        }

        body.loaded .header {
            animation: slideDown 0.8s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        kbd {
            background-color: var(--color-surface-light);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            padding: 2px 6px;
            font-family: monospace;
            font-size: 0.9em;
            color: var(--color-primary);
        }
    `;
    document.head.appendChild(style);
});

// 打印优化
window.addEventListener('beforeprint', function() {
    // 在打印前添加打印优化类
    document.body.classList.add('printing');

    // 隐藏一些不需要打印的元素
    const elementsToHide = document.querySelectorAll('.footer-links, .interest-icon, .contact-item i');
    elementsToHide.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // 打印后恢复
    document.body.classList.remove('printing');

    const elementsToHide = document.querySelectorAll('.footer-links, .interest-icon, .contact-item i');
    elementsToHide.forEach(el => {
        el.style.display = '';
    });
});