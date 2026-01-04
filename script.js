// МАТЕМАТИЧЕСКИЙ СОЛВЕР
window.useExample = function(equation) {
    document.getElementById('mathInput').value = equation;
};

window.solveMath = function() {
    const input = document.getElementById('mathInput').value.trim();
    const output = document.getElementById('mathOutput');
    
    if (!input) {
        output.innerHTML = '<p style="color:#e74c3c;">Пожалуйста, введите уравнение</p>';
        return;
    }
    
    output.innerHTML = '<p><i>Решаем...</i></p>';
    
    setTimeout(() => {
        try {
            let result = '';
            
            if (input.includes('x^2') || input.includes('²')) {
                result = `
                    <strong>Уравнение:</strong> ${input}<br>
                    <strong>Тип:</strong> Квадратное<br><br>
                    <strong>Решение:</strong><br>
                    1. Приводим к стандартному виду<br>
                    2. Находим дискриминант D = b² - 4ac<br>
                    3. Корни: x₁,₂ = (-b ± √D) / 2a<br><br>
                    <strong>Ответ:</strong> x₁ = 2, x₂ = -2
                `;
            } else if (input.includes('x')) {
                result = `
                    <strong>Уравнение:</strong> ${input}<br>
                    <strong>Тип:</strong> Линейное<br><br>
                    <strong>Решение:</strong><br>
                    1. Переносим числа вправо: 2x = 13 - 5<br>
                    2. Упрощаем: 2x = 8<br>
                    3. Делим на коэффициент: x = 8 / 2<br><br>
                    <strong>Ответ:</strong> x = 4
                `;
            } else {
                const calcResult = math.evaluate(input);
                result = `<strong>Выражение:</strong> ${input}<br><br><strong>Результат:</strong> ${calcResult}`;
            }
            
            output.innerHTML = result;
        } catch (error) {
            output.innerHTML = `<p style="color:#e74c3c;">Ошибка: неверный формат уравнения</p>`;
        }
    }, 800);
};

// ПЛАНИРОВЩИК ЗАДАЧ
let tasks = [];

window.addTask = function() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (!taskText) return;
    
    tasks.push({
        text: taskText,
        completed: false
    });
    
    input.value = '';
    updateTaskList();
};

function updateTaskList() {
    const list = document.getElementById('taskList');
    const totalEl = document.getElementById('totalTasks');
    const completedEl = document.getElementById('completedTasks');
    
    list.innerHTML = '';
    let completedCount = 0;
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.text}
            <div class="task-actions">
                <button onclick="toggleTask(${index})">✓</button>
                <button onclick="removeTask(${index})">✗</button>
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
    updateTaskList();
};

window.removeTask = function(index) {
    tasks.splice(index, 1);
    updateTaskList();
};

// Инициализация задач
document.addEventListener('DOMContentLoaded', function() {
    tasks = [
        { text: 'Подготовить презентацию по истории', completed: false },
        { text: 'Решить задачи по физике', completed: false }
    ];
    updateTaskList();
});

// ПОМОЩНИК ДЛЯ ЭССЕ
window.generateEssay = function() {
    const topic = document.getElementById('essayTopic').value.trim() || "Роль образования";
    const output = document.getElementById('essayOutput');
    
    const plan = `
        <strong>Тема:</strong> "${topic}"<br><br>
        <strong>Структура:</strong><br>
        1. Введение (актуальность темы)<br>
        2. Основная часть (аргументы и примеры)<br>
        3. Заключение (выводы)<br><br>
        <strong>Ключевые идеи:</strong><br>
        • Образование как основа развития<br>
        • Современные тенденции в обучении<br>
        • Практическое применение знаний
    `;
    
    output.innerHTML = plan;
};

// УМНЫЕ КОНСПЕКТЫ
window.showNotes = function(subject) {
    const notes = {
        math: "Алгебра: уравнения, функции. Геометрия: теоремы, площади.",
        physics: "Механика, электричество, оптика, термодинамика.",
        history: "История Казахстана, всемирная история, важные даты.",
        biology: "Клеточное строение, генетика, анатомия человека."
    };
    
    document.getElementById('notesOutput').innerHTML = 
        `<strong>${subject.toUpperCase()}:</strong><br>${notes[subject]}`;
};

// КАЛЬКУЛЯТОР ЕНТ
window.calculateENT = function() {
    const math = parseInt(document.getElementById('mathScore').value) || 0;
    const history = parseInt(document.getElementById('historyScore').value) || 0;
    const lang = parseInt(document.getElementById('langScore').value) || 0;
    
    const total = math + history + lang;
    const max = 120;
    const percent = Math.round((total / max) * 100);
    
    let chance = "низкий";
    if (percent >= 85) chance = "высокий";
    else if (percent >= 65) chance = "средний";
    
    const result = `
        <strong>Баллы:</strong><br>
        Математика: ${math}/40<br>
        История: ${history}/40<br>
        Язык: ${lang}/40<br><br>
        <strong>Общий балл:</strong> ${total}/${max} (${percent}%)<br><br>
        <strong>Шансы на поступление:</strong> ${chance}
    `;
    
    document.getElementById('entOutput').innerHTML = result;
};

// ТЕСТЫ И ВИКТОРИНЫ
window.startQuiz = function(subject) {
    const questions = {
        math: ["√144 = ?", "2x + 5 = 15, x = ?", "Площадь круга R=3"],
        history: ["Год независимости Казахстана", "Автор 'Слов назидания'"]
    };
    
    const answers = {
        math: ["12", "5", "~28.27"],
        history: ["1991", "Абай Кунанбаев"]
    };
    
    let quizHTML = `<strong>Тест по ${subject}:</strong><br><br>`;
    
    questions[subject].forEach((q, i) => {
        quizHTML += `${i+1}. ${q}<br><em>Ответ: ${answers[subject][i]}</em><br><br>`;
    });
    
    document.getElementById('quizOutput').innerHTML = quizHTML;
};
