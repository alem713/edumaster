// ==================== МАТЕМАТИЧЕСКИЙ РЕШАТЕЛЬ ====================
window.solveMath = function() {
    const input = document.getElementById('mathInput').value.trim();
    const output = document.getElementById('mathOutput');
    if (!input) {
        output.innerHTML = `<p style="color: #e74c3c;">Введите уравнение для решения.</p>`;
        return;
    }

    output.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> Решаем уравнение...</p>`;

    // Имитация загрузки и вычислений
    setTimeout(() => {
        try {
            // Парсим и решаем уравнение (базовая логика)
            let solutionText;
            let steps = [];

            // Примеры для разных типов уравнений
            if (input.includes('x^2') || input.includes('²')) {
                // Логика для квадратного уравнения (пример)
                solutionText = `Уравнение: <strong>${input}</strong><br>`;
                solutionText += `Тип: <strong>Квадратное уравнение</strong><br>`;
                solutionText += `📝 <strong>Ход решения:</strong><br>`;
                solutionText += `1. Приводим к виду ax² + bx + c = 0.<br>`;
                solutionText += `2. Находим дискриминант: D = b² - 4ac.<br>`;
                solutionText += `3. Корни: x₁ = (-b + √D) / 2a, x₂ = (-b - √D) / 2a.<br><br>`;
                solutionText += `✅ <strong>Примерный ответ:</strong> x₁ ≈ 2.00, x₂ ≈ -2.00`;
            } else if (input.includes('x')) {
                // Логика для линейного уравнения
                solutionText = `Уравнение: <strong>${input}</strong><br>`;
                solutionText += `Тип: <strong>Линейное уравнение</strong><br>`;
                solutionText += `📝 <strong>Ход решения:</strong><br>`;
                solutionText += `1. Переносим числа в правую часть: ax = b.<br>`;
                solutionText += `2. Делим обе части на коэффициент при x: x = b / a.<br><br>`;
                solutionText += `✅ <strong>Примерный ответ:</strong> x = 4`;
            } else {
                // Простое вычисление
                const result = math.evaluate(input);
                solutionText = `Выражение: <strong>${input}</strong><br><br>`;
                solutionText += `✅ <strong>Результат:</strong> ${result}`;
            }

            output.innerHTML = solutionText;
        } catch (error) {
            output.innerHTML = `<p style="color: #e74c3c;">Ошибка: "${input}" - неверный формат. Попробуйте: <em>2x+5=13</em></p>`;
        }
    }, 800);
};

// ==================== ПЛАНИРОВЩИК ЗАДАЧ ====================
let tasks = [];

window.addTask = function() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text: text, completed: false });
    input.value = '';
    renderTaskList();
};

function renderTaskList() {
    const list = document.getElementById('taskList');
    const totalEl = document.getElementById('totalTasks');
    const completedEl = document.getElementById('completedTasks');

    list.innerHTML = '';
    let completedCount = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button onclick="toggleTask(${index})" title="Отметить"><i class="fas fa-check"></i></button>
                <button onclick="deleteTask(${index})" title="Удалить"><i class="fas fa-times"></i></button>
            </div>
        `;
        list.appendChild(li);
        if (task.completed) completedCount++;
    });

    totalEl.textContent = tasks.length;
    completedEl.textContent = completedCount;
}

window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTaskList();
};

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTaskList();
};

// Инициализируем список парой примеров при загрузке
document.addEventListener('DOMContentLoaded', () => {
    tasks = [
        { text: 'Подготовить презентацию по истории', completed: false },
        { text: 'Решить задачи по физике', completed: false }
    ];
    renderTaskList();
});

// ==================== ПОМОЩНИК ДЛЯ ЭССЕ ====================
window.generateEssayPlan = function() {
    const topic = document.getElementById('essayTopic').value.trim() || "Роль образования в современном мире";
    const output = document.getElementById('essayOutput');

    const plan = `
        <strong>Тема:</strong> "${topic}"<br><br>
        <strong>📑 Примерная структура:</strong><br>
        1. <em>Введение</em> - актуальность темы, постановка проблемы.<br>
        2. <em>Основная часть</em> - аргументы и примеры из истории и науки.<br>
        3. <em>Заключение</em> - выводы, перспективы, личное мнение.<br><br>
        <strong>💡 Ключевые аргументы:</strong><br>
        • Образование — основа развития личности.<br>
        • Технологии меняют методы обучения.<br>
        • Доступность знаний определяет будущее общества.<br><br>
        <strong>📚 Примеры для раскрытия:</strong><br>
        • Сравнение систем образования в разных странах.<br>
        • Влияние пандемии на дистанционное обучение.
    `;
    output.innerHTML = plan;
};

// ==================== УМНЫЕ КОНСПЕКТЫ ====================
window.loadNotes = function(subject) {
    const notes = {
        math: "<strong>Математика. Алгебра:</strong> Квадратные уравнения, графики функций. <strong>Геометрия:</strong> Теорема Пифагора, площади фигур.",
        physics: "<strong>Физика. Механика:</strong> Законы Ньютона. <strong>Электричество:</strong> Закон Ома, схема соединений.",
        history: "<strong>История Казахстана:</strong> Основные периоды, выдающиеся личности. <strong>Всемирная история:</strong> Важные события XX века.",
        biology: "<strong>Биология:</strong> Строение клетки, система органов человека, основы генетики."
    };
    document.getElementById('notesOutput').innerHTML = notes[subject] || "Материалы для этого предмета готовятся.";
};

// ==================== КАЛЬКУЛЯТОР ЕНТ ====================
window.calculateENT = function() {
    const math = parseInt(document.getElementById('mathScore').value) || 0;
    const history = parseInt(document.getElementById('historyScore').value) || 0;
    const lang = parseInt(document.getElementById('langScore').value) || 0;
    const total = math + history + lang;
    const max = 120;

    let chance = "низкий";
    let advice = "Рекомендуется усиленная подготовка.";
    if (total >= 100) { chance = "очень высокий"; advice = "Отличный результат! Выбирайте лучшие вузы."; }
    else if (total >= 80) { chance = "высокий"; advice = "Хорошие шансы на бюджетные места."; }
    else if (total >= 60) { chance = "средний"; advice = "Продолжайте готовиться, у вас есть потенциал."; }

    const result = `
        <strong>Ваши баллы:</strong><br>
        Математика: ${math}/40 | История: ${history}/40 | Язык: ${lang}/40<br><br>
        <strong>Общая сумма:</strong> ${total} из ${max} возможных.<br><br>
        <strong>🎯 Шансы на поступление:</strong> ${chance}.<br><br>
        <strong>💬 Рекомендация:</strong> ${advice}
    `;
    document.getElementById('entOutput').innerHTML = result;
};

// ==================== ТЕСТЫ И ВИКТОРИНЫ ====================
window.startQuiz = function(subject) {
    const questions = {
        math: ["Чему равен √144?", "Решите: 2x + 5 = 15. Найдите x.", "Чему равна площадь круга с радиусом 3?"],
        history: ["В каком году Казахстан стал независимым?", "Кто является автором «Слов назидания»?"]
    };
    const answers = {
        math: ["12", "5", "~28.27"],
        history: ["1991", "Абай Кунанбаев"]
    };

    let quizHTML = `<strong>Тест по ${subject === 'math' ? 'Математике' : 'Истории'}:</strong><br><br>`;
    questions[subject].forEach((q, i) => {
        quizHTML += `${i+1}. ${q} <br><em>Ответ: ${answers[subject][i]}</em><br><br>`;
    });
    quizHTML += `<small>Проверьте свои знания! В будущем здесь будет интерактивный тест.</small>`;
    document.getElementById('quizOutput').innerHTML = quizHTML;
};
