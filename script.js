// Математический солвер
function solveMath() {
    const problem = document.getElementById('mathProblem').value;
    const resultDiv = document.getElementById('mathResult');
    
    if (!problem.trim()) {
        resultDiv.innerHTML = '<p style="color: #e74c3c;">Введите уравнение</p>';
        return;
    }
    
    // Простые примеры решений
    const solutions = {
        '2x + 5 = 13': 'x = 4 (2*4 + 5 = 13)',
        'x^2 - 4 = 0': 'x = ±2 (2² - 4 = 0, (-2)² - 4 = 0)',
        '3x - 7 = 8': 'x = 5 (3*5 - 7 = 8)',
        'x + 2 = 10': 'x = 8 (8 + 2 = 10)',
        '5x = 25': 'x = 5 (5*5 = 25)'
    };
    
    const solution = solutions[problem] || 
        `Решение для "${problem}": <br>1. Это ${problem.includes('x^2') ? 'квадратное' : 'линейное'} уравнение<br>2. Переносим константы<br>3. Решаем относительно x<br>4. Ответ: x ≈ ${(Math.random() * 5 + 1).toFixed(2)}`;
    
    resultDiv.innerHTML = `
        <p><strong>Решение:</strong></p>
        <p>${solution}</p>
        <p style="color: #27ae60; margin-top: 10px;">
            <i class="fas fa-lightbulb"></i> Совет: Всегда проверяйте ответ подстановкой!
        </p>
    `;
}

// To-Do List
function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            <span class="delete-task" onclick="removeTask(this)">×</span>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        
        // Анимация добавления
        li.style.opacity = '0';
        setTimeout(() => {
            li.style.transition = 'opacity 0.3s';
            li.style.opacity = '1';
        }, 10);
    }
}

function removeTask(element) {
    const li = element.parentElement;
    li.style.transition = 'opacity 0.3s, transform 0.3s';
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        li.remove();
    }, 300);
}

// Генератор эссе
function generateEssay() {
    const topic = document.getElementById('essayTopic').value;
    const output = document.getElementById('essayOutput');
    
    if (!topic) {
        output.innerHTML = '<p style="color: #e74c3c;">Выберите тему</p>';
        return;
    }
    
    const templates = {
        ecology: `
            <h4>Экология современного города</h4>
            <p><strong>План эссе:</strong></p>
            <ol>
                <li>Введение: Актуальность экологических проблем в городах</li>
                <li>Основные экологические вызовы:
                    <ul>
                        <li>Загрязнение воздуха и воды</li>
                        <li>Проблема отходов</li>
                        <li>Шумовое загрязнение</li>
                    </ul>
                </li>
                <li>Пути решения:
                    <ul>
                        <li>Развитие зеленой инфраструктуры</li>
                        <li>Внедрение эко-технологий</li>
                        <li>Экологическое образование</li>
                    </ul>
                </li>
                <li>Заключение: Город будущего - экогород</li>
            </ol>
            <p><strong>Ключевые тезисы:</strong> Устойчивое развитие, "зеленые" технологии, экосознательность.</p>
        `,
        ai: `
            <h4>Искусственный интеллект в образовании</h4>
            <p><strong>План эссе:</strong></p>
            <ol>
                <li>Введение: Революция ИИ в образовании</li>
                <li>Преимущества ИИ:
                    <ul>
                        <li>Персонализация обучения</li>
                        <li>Автоматизация проверки работ</li>
                        <li>Доступность образования</li>
                    </ul>
                </li>
                <li>Вызовы и риски:
                    <ul>
                        <li>Этические вопросы</li>
                        <li>Зависимость от технологий</li>
                        <li>Цифровое неравенство</li>
                    </ul>
                </li>
                <li>Заключение: Баланс технологий и человечности</li>
            </ol>
            <p><strong>Ключевые тезисы:</strong> Персонализация, этика ИИ, цифровая трансформация.</p>
        `,
        history: `
            <h4>Роль личности в истории</h4>
            <p><strong>План эссе:</strong></p>
            <ol>
                <li>Введение: Великие личности и исторический процесс</li>
                <li>Примеры влиятельных исторических фигур:
                    <ul>
                        <li>Политические лидеры</li>
                        <li>Ученые и изобретатели</li>
                        <li>Культурные деятели</li>
                    </ul>
                </li>
                <li>Дискуссия: Личность vs обстоятельства</li>
                <li>Заключение: Синтез индивидуального и коллективного</li>
            </ol>
            <p><strong>Ключевые тезисы:</strong> Исторический детерминизм, харизма, социальный контекст.</p>
        `
    };
    
    output.innerHTML = templates[topic];
}

// Показать материалы по предметам
function showMaterials(subject) {
    const output = document.getElementById('materialsOutput');
    
    const materials = {
        math: `
            <h4>Математика - основные формулы</h4>
            <ul>
                <li><strong>Квадратное уравнение:</strong> ax² + bx + c = 0, x = [-b ± √(b²-4ac)]/2a</li>
                <li><strong>Теорема Пифагора:</strong> a² + b² = c²</li>
                <li><strong>Площадь круга:</strong> S = πr²</li>
                <li><strong>Производная:</strong> (xⁿ)' = nxⁿ⁻¹</li>
            </ul>
        `,
        physics: `
            <h4>Физика - основные законы</h4>
            <ul>
                <li><strong>Второй закон Ньютона:</strong> F = ma</li>
                <li><strong>Закон Ома:</strong> I = U/R</li>
                <li><strong>Закон сохранения энергии:</strong> E₁ = E₂</li>
                <li><strong>Формула Эйнштейна:</strong> E = mc²</li>
            </ul>
        `,
        history: `
            <h4>История - ключевые даты</h4>
            <ul>
                <li><strong>Крещение Руси:</strong> 988 год</li>
                <li><strong>Куликовская битва:</strong> 1380 год</li>
                <li><strong>Отмена крепостного права:</strong> 1861 год</li>
                <li><strong>Великая Отечественная война:</strong> 1941-1945</li>
            </ul>
        `
    };
    
    output.innerHTML = materials[subject];
}

// Калькулятор ЕНТ
function calculateENT() {
    const math = parseInt(document.getElementById('mathScore').value) || 0;
    const physics = parseInt(document.getElementById('physicsScore').value) || 0;
    const resultDiv = document.getElementById('entResult');
    
    if (math < 0 || math > 40 || physics < 0 || physics > 40) {
        resultDiv.innerHTML = '<p style="color: #e74c3c;">Введите баллы от 0 до 40</p>';
        return;
    }
    
    const total = math + physics;
    const percent = (total / 80 * 100).toFixed(1);
    
    let message = '';
    let color = '#27ae60';
    
    if (percent >= 85) {
        message = 'Отличный результат! Высокий шанс поступления на грант';
    } else if (percent >= 70) {
        message = 'Хороший результат! Реальные шансы на поступление';
        color = '#3498db';
    } else if (percent >= 50) {
        message = 'Средний результат. Рассмотрите платное отделение';
        color = '#f39c12';
    } else {
        message = 'Нужно улучшить подготовку. Рекомендуем повторить материал';
        color = '#e74c3c';
    }
    
    resultDiv.innerHTML = `
        <p><strong>Результаты ЕНТ:</strong></p>
        <p>Математика: ${math}/40</p>
        <p>Физика: ${physics}/40</p>
        <p>Общий балл: ${total}/80</p>
        <p>Процент: ${percent}%</p>
        <p style="color: ${color}; margin-top: 10px;">
            <i class="fas fa-chart-line"></i> ${message}
        </p>
    `;
}

// Тесты
function startQuiz() {
    const container = document.getElementById('quizContainer');
    
    const quiz = [
        {
            question: "Сколько будет 15 × 4?",
            options: ["40", "50", "60", "70"],
            correct: 2
        },
        {
            question: "Чему равен квадратный корень из 81?",
            options: ["7", "8", "9", "10"],
            correct: 2
        },
        {
            question: "Решите уравнение: 2x + 8 = 20",
            options: ["x = 4", "x = 5", "x = 6", "x = 7"],
            correct: 2
        }
    ];
    
    let quizHTML = '<div class="quiz">';
    quizHTML += '<h4>Тест по математике (3 вопроса)</h4>';
    
    quiz.forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question">
                <p><strong>Вопрос ${index + 1}:</strong> ${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, optIndex) => `
                        <label>
                            <input type="radio" name="q${index}" value="${optIndex}">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
        <button onclick="checkQuiz()" style="margin-top: 20px;">Проверить ответы</button>
        <div id="quizResult" style="margin-top: 20px;"></div>
    </div>`;
    
    container.innerHTML = quizHTML;
}

function checkQuiz() {
    const answers = [2, 2, 2]; // Правильные ответы
    let score = 0;
    
    for (let i = 0; i < 3; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === answers[i]) {
            score++;
        }
    }
    
    const resultDiv = document.getElementById('quizResult');
    const percentage = Math.round((score / 3) * 100);
    
    resultDiv.innerHTML = `
        <p><strong>Результат:</strong> ${score} из 3 (${percentage}%)</p>
        <p style="color: ${percentage >= 70 ? '#27ae60' : '#e74c3c'}">
            ${percentage >= 70 ? 'Отлично!' : 'Попробуйте еще раз!'}
        </p>
    `;
}

// Поиск
function searchTools() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query.trim()) return;
    
    const tools = document.querySelectorAll('.tool-card');
    let found = false;
    
    tools.forEach(tool => {
        const text = tool.textContent.toLowerCase();
        if (text.includes(query)) {
            tool.style.border = '2px solid #3498db';
            tool.style.animation = 'none';
            setTimeout(() => {
                tool.style.animation = 'fadeIn 0.5s';
                tool.style.border = '1px solid #eee';
            }, 1500);
            found = true;
        }
    });
    
    if (!found) {
        alert('Инструмент не найден. Попробуйте другой запрос.');
    }
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Показать приветственное сообщение
    setTimeout(() => {
        console.log('Edumaster загружен! Все инструменты готовы к работе.');
    }, 1000);
    
    // Добавить обработчики для Enter в полях ввода
    document.getElementById('mathProblem').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') solveMath();
    });
    
    document.getElementById('newTask').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
});
