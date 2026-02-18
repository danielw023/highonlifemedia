// Custom Date Picker Overlay Logic
(function() {
    const overlay = document.getElementById('custom-datepicker-overlay');
    const grid = document.getElementById('datepicker-grid');
    const monthLabel = document.getElementById('datepicker-month-label');
    const prevBtn = document.getElementById('datepicker-prev-month');
    const nextBtn = document.getElementById('datepicker-next-month');
    const closeBtn = document.getElementById('datepicker-close');
    const input = document.getElementById('date');
    const monthSelect = document.getElementById('datepicker-month-select');
    const yearSelect = document.getElementById('datepicker-year-select');

    // Check if all required elements exist
    if (!overlay || !grid || !prevBtn || !nextBtn || !closeBtn || !input || !monthSelect || !yearSelect) {
        console.warn('Date picker elements not found');
        return;
    }

    let selectedDate = null;
    let currentMonth = null;
    let currentYear = null;

    function pad(n) { return n < 10 ? '0' + n : n; }

    // Month and year select setup
    const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    
    function populateMonthSelect(selectedMonth) {
        monthSelect.innerHTML = '';
        monthNames.forEach((name, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = name.toUpperCase();
            if (idx === selectedMonth) opt.selected = true;
            monthSelect.appendChild(opt);
        });
    }
    
    function populateYearSelect(selectedYear) {
        yearSelect.innerHTML = '';
        const thisYear = new Date().getFullYear();
        for (let y = thisYear; y <= thisYear + 5; y++) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            if (y === selectedYear) opt.selected = true;
            yearSelect.appendChild(opt);
        }
    }

    function renderCalendar(month, year) {
        grid.innerHTML = '';
        // Weekday headers
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        weekdays.forEach(d => {
            const el = document.createElement('div');
            el.className = 'custom-datepicker-weekday';
            el.textContent = d;
            grid.appendChild(el);
        });
        // First day of month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0,0,0,0); // Set to midnight once
        
        // Fill blanks
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            blank.className = 'custom-datepicker-day disabled';
            grid.appendChild(blank);
        }
        
        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const dayEl = document.createElement('div');
            dayEl.className = 'custom-datepicker-day';
            dayEl.textContent = d;
            
            // Check if date is in the past
            const isPastDate = date < today;
            
            // Highlight today
            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                dayEl.classList.add('today');
            }
            
            // Highlight selected
            if (
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
            ) {
                dayEl.classList.add('selected');
            }
            
            // Disable past dates
            if (isPastDate) {
                dayEl.classList.add('disabled');
                dayEl.classList.add('past-date');
                dayEl.style.opacity = '0.3';
                dayEl.style.cursor = 'not-allowed';
            } else {
                // Only add click listener for future dates
                dayEl.addEventListener('click', function() {
                    selectedDate = date;
                    input.value = `${year}-${pad(month+1)}-${pad(d)}`;
                    overlay.style.display = 'none';
                    if (window.bodyScrollLock) {
                        window.bodyScrollLock.enableBodyScroll(overlay);
                    }
                });
                dayEl.style.cursor = 'pointer';
            }
            
            grid.appendChild(dayEl);
        }
        
        // Update selects
        populateMonthSelect(month);
        populateYearSelect(year);
        
        // Disable prev button if on current month/year
        if (month === today.getMonth() && year === today.getFullYear()) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
        }
    }

    function openCalendar() {
        const now = selectedDate || new Date();
        currentMonth = now.getMonth();
        currentYear = now.getFullYear();
        renderCalendar(currentMonth, currentYear);
        overlay.style.display = 'flex';
        if (window.bodyScrollLock) {
            window.bodyScrollLock.disableBodyScroll(overlay);
        }
    }

    function closeCalendar() {
        overlay.style.display = 'none';
        if (window.bodyScrollLock) {
            window.bodyScrollLock.enableBodyScroll(overlay);
        }
    }

    // Event Listeners
    input.addEventListener('focus', function(e) {
        e.preventDefault();
        openCalendar();
    });
    input.addEventListener('click', function(e) {
        e.preventDefault();
        openCalendar();
    });
    
    // Prevent native date picker from showing
    input.addEventListener('mousedown', function(e) {
        e.preventDefault();
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCalendar();
        }
    });
    
    closeBtn.addEventListener('click', closeCalendar);
    
    prevBtn.addEventListener('click', function() {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        // Only allow if not going to past
        const today = new Date();
        if (newYear > today.getFullYear() || (newYear === today.getFullYear() && newMonth >= today.getMonth())) {
            currentMonth = newMonth;
            currentYear = newYear;
            renderCalendar(currentMonth, currentYear);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        // If going beyond 5-year limit, jump back to current year and month
        const today = new Date();
        if (newYear >= today.getFullYear() + 6) {
            newYear = today.getFullYear();
            newMonth = today.getMonth();
        }
        currentMonth = newMonth;
        currentYear = newYear;
        renderCalendar(currentMonth, currentYear);
    });
    
    // Close on overlay click (not modal)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeCalendar();
    });

    // Swipe support for mobile
    let touchStartX = null;
    let touchEndX = null;
    const modal = document.querySelector('.custom-datepicker-modal');
    if (modal) {
        modal.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
            }
        });
        modal.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) {
                touchEndX = e.touches[0].clientX;
            }
        });
        modal.addEventListener('touchend', function() {
            if (touchStartX !== null && touchEndX !== null) {
                const dx = touchEndX - touchStartX;
                if (Math.abs(dx) > 50) { // threshold for swipe
                    if (dx < 0) {
                        // Swipe left: next month
                        nextBtn.click();
                    } else if (dx > 0 && !prevBtn.disabled) {
                        // Swipe right: prev month
                        prevBtn.click();
                    }
                }
            }
            touchStartX = null;
            touchEndX = null;
        });
    }

    // Month/year select change handlers
    monthSelect.addEventListener('change', function() {
        const newMonth = parseInt(monthSelect.value, 10);
        const today = new Date();
        // Only allow if not going to past
        if (currentYear > today.getFullYear() || (currentYear === today.getFullYear() && newMonth >= today.getMonth())) {
            currentMonth = newMonth;
            renderCalendar(currentMonth, currentYear);
        } else {
            // Reset to valid selection
            populateMonthSelect(currentMonth);
        }
    });
    
    yearSelect.addEventListener('change', function() {
        const newYear = parseInt(yearSelect.value, 10);
        const today = new Date();
        // Only allow if not going to past
        if (newYear > today.getFullYear() || (newYear === today.getFullYear() && currentMonth >= today.getMonth())) {
            currentYear = newYear;
            // If selecting current year, go to current month
            if (newYear === today.getFullYear() && currentMonth < today.getMonth()) {
                currentMonth = today.getMonth();
            }
            renderCalendar(currentMonth, currentYear);
        } else {
            // Reset to valid selection
            populateYearSelect(currentYear);
        }
    });
})(); 