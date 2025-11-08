// Dark mode toggle
        function toggleDarkMode() {
            document.body.classList.toggle('dark');
        }

        // Tab switching
        const tabs = document.querySelectorAll('.tab');
        const formSection = document.querySelector('.form-section');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.dataset.tab;
                formSection.classList.remove('login', 'signup', 'reset');
                formSection.classList.add(tabName);
            });
        });

        // Input validation
        function validateInput(input) {
            if (input.checkValidity()) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        }

        // Progress bar and XP
        function updateProgress(formId) {
            const form = document.getElementById(formId);
            const inputs = form.querySelectorAll('input[required]');
            const progressBar = form.querySelector('.progress-bar');
            const xpFill = document.querySelector('.xp-fill');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    let filled = 0;
                    inputs.forEach(inp => {
                        if (inp.value.trim() !== '') filled++;
                    });
                    const progress = (filled / inputs.length) * 100;
                    progressBar.style.width = `${progress}%`;
                    xpFill.style.width = `${progress / 3}%`; // Global XP fills slower
                });
            });
        }
        updateProgress('login-box');
        updateProgress('signup-box');
        updateProgress('reset-box');

        // Form submit with gamification
        function submitForm(tab) {
            // Placeholder submit logic
            alert(`${tab.charAt(0).toUpperCase() + tab.slice(1)} successful! (Placeholder)`);
            // Show achievement
            const modal = document.getElementById('achievement-modal');
            modal.style.display = 'block';
            setTimeout(() => { modal.style.display = 'none'; }, 3000);
            // Confetti
            confetti();
        }

        // Confetti function (simple canvas)
        function confetti() {
            const canvas = document.getElementById('confetti-canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            const pieces = [];
            for (let i = 0; i < 100; i++) {
                pieces.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    r: Math.random() * 4 + 1,
                    d: Math.random() * 100 + 1,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    tilt: Math.random() * 10 - 5,
                    tiltAngle: 0
                });
            }
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                pieces.forEach(p => {
                    p.tiltAngle += 0.1;
                    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                    p.x += Math.sin(p.d);
                    p.tilt = Math.sin(p.tiltAngle) * 15;
                    if (p.y > canvas.height) return;
                    ctx.beginPath();
                    ctx.lineWidth = p.r;
                    ctx.strokeStyle = p.color;
                    ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
                    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
                    ctx.stroke();
                });
                if (pieces.some(p => p.y < canvas.height)) requestAnimationFrame(draw);
                else ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            draw();
        }

        // Google button placeholder
        document.querySelectorAll('.google-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Continue with Google! (Placeholder)');
                submitForm('google');
            });
        });
