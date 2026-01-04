// ==================== МАТЕМАТИЧЕСКИЙ РЕШАТЕЛЬ ====================

// Обработчик для кнопок математического решателя
document.addEventListener('DOMContentLoaded', function() {
    const solveBtn = document.querySelector('.solve-btn');
    const equationInput = document.querySelector('.equation-input');
    const solutionOutput = document.querySelector('.solution-output');
    
    // Примеры уравнений (при клике на них вставляются в поле ввода)
    const exampleButtons = document.querySelectorAll('.equation-example');
    
    // Обработчик для кнопки "Решить"
    if (solveBtn) {
        solveBtn.addEventListener('click', function() {
            const equation = equationInput.value.trim();
            
            if (!equation) {
                solutionOutput.innerHTML = '<p class="error">Введите уравнение!</p>';
                return;
            }
            
            solutionOutput.innerHTML = '<p class="loading">Решаем... ⏳</p>';
            
            // Имитация загрузки для лучшего UX
            setTimeout(() => {
                try {
                    const solution = solveEquation(equation);
                    solutionOutput.innerHTML = formatSolution(solution);
                } catch (error) {
                    solutionOutput.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
                }
            }, 500);
        });
    }
    
    // Обработчики для примеров уравнений
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            equationInput.value = this.textContent;
        });
    });
});

// Основная функция решения уравнений
function solveEquation(equation) {
    // Убираем пробелы и приводим к нижнему регистру
    equation = equation.replace(/\s+/g, '').toLowerCase();
    
    // Проверяем тип уравнения и решаем
    if (equation.includes('=')) {
        return solveAlgebraicEquation(equation);
    } else {
        return solveExpression(equation);
    }
}

// Решение алгебраических уравнений (с =)
function solveAlgebraicEquation(equation) {
    const parts = equation.split('=');
    if (parts.length !== 2) {
        throw new Error('Неправильный формат уравнения. Используйте: 2x+5=13');
    }
    
    const left = parts[0];
    const right = parts[1];
    
    // Определяем тип уравнения
    if (isLinearEquation(left, right)) {
        return solveLinearEquation(left, right);
    } else if (isQuadraticEquation(left, right)) {
        return solveQuadraticEquation(left, right);
    } else {
        // Попробуем решить через math.js
        try {
            const solutions = math.solve(equation, 'x');
            return {
                type: 'complex',
                equation: equation,
                solution: solutions,
                steps: ['Использована символьная математика для решения уравнения']
            };
        } catch (error) {
            throw new Error('Это уравнение пока не поддерживается. Попробуйте линейное (2x+5=13) или квадратное (x^2-4=0)');
        }
    }
}

// Проверка: линейное ли уравнение?
function isLinearEquation(left, right) {
    const expr = `(${left})-(${right})`;
    try {
        const simplified = math.simplify(expr);
        const degree = getPolynomialDegree(simplified.toString(), 'x');
        return degree <= 1;
    } catch (error) {
        return false;
    }
}

// Решение линейного уравнения
function solveLinearEquation(left, right) {
    const steps = [];
    
    // Шаг 1: Переносим всё в одну сторону
    const expr = `(${left})-(${right})`;
    steps.push(`1. Переносим всё влево: ${expr} = 0`);
    
    // Шаг 2: Упрощаем
    const simplified = math.simplify(expr);
    steps.push(`2. Упрощаем: ${simplified.toString()} = 0`);
    
    // Шаг 3: Решаем относительно x
    let solution;
    try {
        solution = math.solve(simplified.toString(), 'x');
        steps.push(`3. Решаем относительно x: x = ${solution}`);
    } catch (error) {
        // Если math.js не справился, решаем вручную для формата ax+b=0
        const match = simplified.toString().match(/([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?/);
        if (match) {
            const a = match[1] ? parseFloat(match[1]) : 1;
            const b = match[2] ? parseFloat(match[2]) : 0;
            solution = -b / a;
            steps.push(`3. Решаем: ${a}x ${b >= 0 ? '+' : ''}${b} = 0 → x = ${-b}/${a} = ${solution}`);
        } else {
            throw new Error('Не удалось решить уравнение');
        }
    }
    
    return {
        type: 'linear',
        equation: `${left}=${right}`,
        solution: solution,
        steps: steps
    };
}

// Проверка: квадратное ли уравнение?
function isQuadraticEquation(left, right) {
    const expr = `(${left})-(${right})`;
    try {
        const simplified = math.simplify(expr);
        const degree = getPolynomialDegree(simplified.toString(), 'x');
        return degree === 2;
    } catch (error) {
        return false;
    }
}

// Решение квадратного уравнения
function solveQuadraticEquation(left, right) {
    const steps = [];
    
    // Шаг 1: Переносим всё в одну сторону
    const expr = `(${left})-(${right})`;
    steps.push(`1. Переносим всё влево: ${expr} = 0`);
    
    // Шаг 2: Упрощаем
    const simplified = math.simplify(expr).toString();
    steps.push(`2. Упрощаем: ${simplified} = 0`);
    
    // Шаг 3: Ищем коэффициенты a, b, c
    const coef = getQuadraticCoefficients(simplified);
    if (!coef) {
        throw new Error('Не удалось определить коэффициенты квадратного уравнения');
    }
    
    const { a, b, c } = coef;
    steps.push(`3. Коэффициенты: a = ${a}, b = ${b}, c = ${c}`);
    
    // Шаг 4: Вычисляем дискриминант
    const D = b * b - 4 * a * c;
    steps.push(`4. Дискриминант: D = b² - 4ac = ${b}² - 4·${a}·${c} = ${D}`);
    
    // Шаг 5: Находим корни
    let solution;
    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        solution = [x1, x2];
        steps.push(`5. D > 0, два корня: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`);
    } else if (D === 0) {
        const x = -b / (2 * a);
        solution = [x];
        steps.push(`5. D = 0, один корень: x = ${x}`);
    } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-D) / (2 * a);
        solution = [real, imag];
        steps.push(`5. D < 0, комплексные корни: x₁ = ${real.toFixed(2)} + ${imag.toFixed(2)}i, x₂ = ${real.toFixed(2)} - ${imag.toFixed(2)}i`);
    }
    
    return {
        type: 'quadratic',
        equation: `${left}=${right}`,
        solution: solution,
        steps: steps,
        discriminant: D
    };
}

// Решение простых выражений (без =)
function solveExpression(expression) {
    try {
        const result = math.evaluate(expression);
        return {
            type: 'expression',
            expression: expression,
            result: result,
            steps: [`Вычисляем: ${expression} = ${result}`]
        };
    } catch (error) {
        throw new Error('Неправильное математическое выражение');
    }
}

// Вспомогательные функции
function getPolynomialDegree(expr, variable) {
    const terms = expr.split(/[+-]/).filter(term => term.includes(variable));
    let maxDegree = 0;
    
    terms.forEach(term => {
        if (term === variable) {
            maxDegree = Math.max(maxDegree, 1);
        } else if (term.includes('^')) {
            const degree = parseInt(term.split('^')[1]);
            if (!isNaN(degree)) maxDegree = Math.max(maxDegree, degree);
        } else if (term.includes('*' + variable) || term.match(/\d+/ + variable)) {
            maxDegree = Math.max(maxDegree, 1);
        }
    });
    
    return maxDegree;
}

function getQuadraticCoefficients(expr) {
    // Убираем "=0" если есть
    expr = expr.replace(/=0$/, '');
    
    // Пытаемся распарсить выражение вида ax^2 + bx + c
    const x2Match = expr.match(/([+-]?\d*\.?\d*)x\^2/);
    const xMatch = expr.match(/([+-]?\d*\.?\d*)x(?!\^)/);
    const constMatch = expr.match(/([+-]?\d+\.?\d*)(?!.*x)/);
    
    const a = x2Match ? (x2Match[1] === '' || x2Match[1] === '+' ? 1 : x2Match[1] === '-' ? -1 : parseFloat(x2Match[1])) : 0;
    const b = xMatch ? (xMatch[1] === '' || xMatch[1] === '+' ? 1 : xMatch[1] === '-' ? -1 : parseFloat(xMatch[1])) : 0;
    const c = constMatch ? parseFloat(constMatch[1]) : 0;
    
    if (a === 0) return null;
    
    return { a, b, c };
}

// Форматирование решения для отображения
function formatSolution(solution) {
    let html = `<div class="solution-box">
        <h4>📝 Уравнение: ${solution.equation || solution.expression}</h4>
        <div class="steps-box"><strong>Шаги решения:</strong><ul>`;
    
    solution.steps.forEach(step => {
        html += `<li>${step}</li>`;
    });
    
    html += `</ul></div><div class="answer-box"><strong>✅ Ответ: </strong>`;
    
    if (Array.isArray(solution.solution || solution.result)) {
        if (solution.type === 'quadratic' && solution.discriminant < 0) {
            const [real, imag] = solution.solution;
            html += `x₁ = ${real.toFixed(2)} + ${imag.toFixed(2)}i, x₂ = ${real.toFixed(2)} - ${imag.toFixed(2)}i`;
        } else {
            html += (solution.solution || solution.result).map((v, i) => `x${i+1} = ${v}`).join(', ');
        }
    } else {
        html += `x = ${solution.solution || solution.result}`;
    }
    
    html += `</div></div>`;
    return html;
}

// ==================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====================

// Активация примеров уравнений
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для примеров
    const examples = document.querySelectorAll('.example-equation');
    
    examples.forEach(example => {
        example.addEventListener('click', function() {
            const equation = this.getAttribute('data-equation');
            const input = document.querySelector('.equation-input');
            if (input) {
                input.value = equation;
            }
        });
    });
    
    // Автоматическое решение при нажатии Enter в поле ввода
    const input = document.querySelector('.equation-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const solveBtn = document.querySelector('.solve-btn');
                if (solveBtn) solveBtn.click();
            }
        });
    }
});

// Простой планировщик задач
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.querySelector('.task-input');
    const addTaskBtn = document.querySelector('.add-task-btn');
    const taskList = document.querySelector('.task-list');
    const taskCount = document.querySelector('.task-count');
    const completedCount = document.querySelector('.completed-count');
    
    if (addTaskBtn && taskInput) {
        addTaskBtn.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = '';
                updateCounters();
            }
        });
    }
    
    function addTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <button class="complete-btn">✓</button>
            <button class="delete-btn">✗</button>
        `;
        
        li.querySelector('.complete-btn').addEventListener('click', function() {
            li.classList.toggle('completed');
            updateCounters();
        });
        
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            updateCounters();
        });
        
        if (taskList) {
            taskList.appendChild(li);
        }
    }
    
    function updateCounters() {
        if (!taskList || !taskCount || !completedCount) return;
        
        const total = taskList.children.length;
        const completed = Array.from(taskList.children).filter(li => 
            li.classList.contains('completed')).length;
        
        taskCount.textContent = total;
        completedCount.textContent = completed;
    }
});
