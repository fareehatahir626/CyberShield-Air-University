/* ============================================= */
/* CYBERSHIELD - AIR UNIVERSITY                  */
/* Complete JavaScript                           */
/* ============================================= */

document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initMatrixRain();
    initScrollProgress();
    initNavbar();
    initStatsCounter();
    initThreatBars();
    initAttackCards();
    initQuiz();
    initSmoothScroll();

    console.log('%c🛡️ CyberShield Initialized', 'color: #00ff88; font-size: 20px;');
    console.log('%cAir University Cyber Security Portal', 'color: #00d4ff;');
    console.log('%cTeam: Fareeha Tahir, Maira Tahir, Khurram Ali Saif', 'color: #ff00aa;');
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 2500);
}

// ============================================
// MATRIX RAIN BACKGROUND
// ============================================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * (canvas.height / fontSize);
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const scrollBar = document.getElementById('scrollBar');
    if (!scrollBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollable = documentHeight - windowHeight;
        const scrollPercent = (scrollTop / scrollable) * 100;
        scrollBar.style.width = scrollPercent + '%';
    });
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// THREAT BARS ANIMATION
// ============================================
function initThreatBars() {
    const threatBars = document.querySelectorAll('.threat-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    });

    threatBars.forEach(bar => observer.observe(bar));
}

// ============================================
// ATTACK CARDS INTERACTION
// ============================================
function initAttackCards() {
    const attackCards = document.querySelectorAll('.attack-card');

    attackCards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            // Close all
            attackCards.forEach(c => c.classList.remove('expanded'));
            // Toggle clicked
            if (!isExpanded) {
                card.classList.add('expanded');
            }
        });
    });
}

// ============================================
// QUIZ SYSTEM
// ============================================
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const quizQuestions = [
        {
            question: "What is Phishing?",
            options: [
                "A type of fishing sport",
                "Fraudulent attempt to obtain sensitive information",
                "A computer game",
                "A programming language"
            ],
            correct: 1,
            explanation: "Phishing is a social engineering attack where attackers disguise as trustworthy entities to steal sensitive information."
        },
        {
            question: "Which of these is a sign of a phishing email?",
            options: [
                "Email from your bank with proper greeting",
                "Urgent language requesting immediate action",
                "Email from known contact",
                "Email with company's official logo"
            ],
            correct: 1,
            explanation: "Phishing emails often use urgent or threatening language to pressure victims into quick decisions."
        },
        {
            question: "What does ransomware do?",
            options: [
                "Protects your computer from viruses",
                "Encrypts files and demands payment",
                "Speeds up your internet",
                "Backs up your data"
            ],
            correct: 1,
            explanation: "Ransomware encrypts your files and demands payment for the decryption key."
        },
        {
            question: "How can you protect yourself on public WiFi?",
            options: [
                "Share your password with friends",
                "Use a VPN",
                "Disable firewall",
                "Access bank accounts without protection"
            ],
            correct: 1,
            explanation: "VPN encrypts your connection and protects your data on public networks."
        },
        {
            question: "What is a strong password?",
            options: [
                "Your birthday",
                "123456",
                "Mix of letters, numbers, and symbols",
                "Your name"
            ],
            correct: 2,
            explanation: "Strong passwords use a mix of uppercase, lowercase, numbers, and symbols."
        },
        {
            question: "What is malware?",
            options: [
                "Computer hardware",
                "Malicious software",
                "A type of monitor",
                "Computer game"
            ],
            correct: 1,
            explanation: "Malware is malicious software designed to damage or gain unauthorized access."
        },
        {
            question: "What is Two-Factor Authentication (2FA)?",
            options: [
                "Using two passwords",
                "An extra layer of security",
                "Logging in twice",
                "Having two accounts"
            ],
            correct: 1,
            explanation: "2FA adds an extra verification step beyond just your password."
        },
        {
            question: "What should you do with suspicious emails?",
            options: [
                "Click all links",
                "Reply with your information",
                "Report and delete",
                "Forward to friends"
            ],
            correct: 2,
            explanation: "Report suspicious emails to IT and delete them without clicking any links."
        },
        {
            question: "What is a DDoS attack?",
            options: [
                "Dance competition",
                "Distributed Denial of Service attack",
                "Download software",
                "Delete data forever"
            ],
            correct: 1,
            explanation: "DDoS (Distributed Denial of Service) overwhelms servers with traffic."
        },
        {
            question: "How often should you update software?",
            options: [
                "Never",
                "Only when forced",
                "Regularly when updates are available",
                "Once a year"
            ],
            correct: 2,
            explanation: "Regular updates patch security vulnerabilities and protect your system."
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function renderQuiz() {
        if (currentQuestion >= quizQuestions.length) {
            showResults();
            return;
        }

        const q = quizQuestions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-progress">
                <span>Question ${currentQuestion + 1} of ${quizQuestions.length}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentQuestion / quizQuestions.length) * 100}%"></div>
                </div>
            </div>
            <div class="quiz-question">
                <h3>${q.question}</h3>
            </div>
            <div class="quiz-options">
                ${q.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
            <div class="quiz-feedback" style="display: none;"></div>
            <button class="quiz-next" style="display: none;">Next Question <i class="fas fa-arrow-right"></i></button>
        `;

        const options = quizContainer.querySelectorAll('.quiz-option');
        const feedback = quizContainer.querySelector('.quiz-feedback');
        const nextBtn = quizContainer.querySelector('.quiz-next');

        options.forEach(option => {
            option.addEventListener('click', () => {
                const selected = parseInt(option.getAttribute('data-index'));
                const isCorrect = selected === q.correct;

                options.forEach(opt => {
                    opt.classList.add('disabled');
                    if (parseInt(opt.getAttribute('data-index')) === q.correct) {
                        opt.classList.add('correct');
                    }
                });

                if (isCorrect) {
                    option.classList.add('correct');
                    score++;
                    feedback.innerHTML = `
                        <div class="feedback correct">
                            <i class="fas fa-check-circle"></i>
                            <p>Correct! ${q.explanation}</p>
                        </div>`;
                } else {
                    option.classList.add('incorrect');
                    feedback.innerHTML = `
                        <div class="feedback incorrect">
                            <i class="fas fa-times-circle"></i>
                            <p>Incorrect. ${q.explanation}</p>
                        </div>`;
                }

                feedback.style.display = 'block';
                nextBtn.style.display = 'flex';
            });
        });

        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            renderQuiz();
        });
    }

    function showResults() {
        const percentage = (score / quizQuestions.length) * 100;
        let message, emoji;

        if (percentage >= 80) {
            message = 'Excellent! You are Cyber Safe! 🛡️';
            emoji = '🏆';
        } else if (percentage >= 60) {
            message = 'Good! But there is more to learn!';
            emoji = '📖';
        } else {
            message = 'Keep learning! Stay Safe!';
            emoji = '🎓';
        }

        quizContainer.innerHTML = `
            <div class="quiz-results">
                <div class="results-icon">${emoji}</div>
                <h3>Quiz Complete!</h3>
                <div class="score-display">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/ ${quizQuestions.length}</span>
                </div>
                <p class="score-message">${message}</p>
                <button class="btn-restart" id="restartBtn">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;

        document.getElementById('restartBtn').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            renderQuiz();
        });
    }

    renderQuiz();
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'q' || e.key === 'Q') {
        document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('%c🛡️ CyberShield Console Ready!', 'color: #00ff88; font-size: 16px;');
console.log('%cPress H for Home, Q for Quiz', 'color: #a0a0b0;');
