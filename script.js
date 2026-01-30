const contentDiv = document.getElementById('main-content');

function showSection(section) {
    if (section === 'ai-helper') {
        contentDiv.innerHTML = `
            <section class="active-section">
                <h2>🤖 ИИ Помощник по ДЗ</h2>
                <div class="calc-container">
                    <p>Введите ваш вопрос по предмету:</p>
                    <textarea id="ai-q" style="width:100%; height:100px; background:#222; color:white; border-radius:10px; padding:10px;"></textarea>
                    <button class="primary-btn" onclick="askAI()" style="margin-top:10px">Получить решение</button>
                    <div id="ai-answer" style="margin-top:20px; color:#a855f7;"></div>
                </div>
            </section>`;
    } 
    
    else if (section === 'ent-calc') {
        contentDiv.innerHTML = `
            <section class="active-section">
                <h2>🧮 Калькулятор баллов ЕНТ</h2>
                <div class="calc-container">
                    <input type="number" id="math" placeholder="Мат. грамотность (max 10)">
                    <input type="number" id="read" placeholder="Грамотность чтения (max 10)">
                    <input type="number" id="hist" placeholder="История Казахстана (max 20)">
                    <input type="number" id="subj1" placeholder="Профильный предмет 1 (max 50)">
                    <input type="number" id="subj2" placeholder="Профильный предмет 2 (max 50)">
                    <button class="primary-btn" onclick="calculateENT()">Рассчитать</button>
                    <h3 id="result" style="margin-top:20px"></h3>
                </div>
            </section>`;
    }

    else if (section === 'courses') {
        contentDiv.innerHTML = `
            <section class="active-section">
                <h2>📚 Мини-курсы по классам</h2>
                <div class="course-grid">
                    <div class="course-item"><h3>5-9 Класс</h3><p>Базовые предметы</p></div>
                    <div class="course-item" style="border: 2px solid #6366f1;"><h3>10-11 Класс</h3><p>Подготовка к выпуску</p></div>
                    <div class="course-item"><h3>🔥 ЕНТ Интенсив</h3><p>Спецкурс 2024</p></div>
                </div>
            </section>`;
    }
}

// Функция калькулятора
function calculateENT() {
    const m = +document.getElementById('math').value || 0;
    const r = +document.getElementById('read').value || 0;
    const h = +document.getElementById('hist').value || 0;
    const s1 = +document.getElementById('subj1').value || 0;
    const s2 = +document.getElementById('subj2').value || 0;
    
    const total = m + r + h + s1 + s2;
    document.getElementById('result').innerText = `Ваш общий балл: ${total} из 140`;
}

// Заглушка для ИИ
function askAI() {
    const q = document.getElementById('ai-q').value;
    const ans = document.getElementById('ai-answer');
    ans.innerText = "Думаю...";
    setTimeout(() => {
        ans.innerText = "Анализ завершен. Для решения этой задачи используйте формулу дискриминанта или метод интервалов. (Интеграция с GPT скоро!)";
    }, 1500);
}
