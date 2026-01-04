// ==================== МАТЕМАТИЧЕСКИЙ ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ ====================
class MathAI {
    constructor() {
        this.history = [];
    }

    // Главная функция решения
    solve(problem) {
        try {
            const cleanProblem = problem.trim().toLowerCase();
            this.history.push({ problem: cleanProblem, timestamp: new Date() });
            
            // Определяем тип задачи
            if (this.isEquation(cleanProblem)) {
                return this.solveEquation(cleanProblem);
            } else if (this.isExpression(cleanProblem)) {
                return this.solveExpression(cleanProblem);
            } else if (this.isGeometry(cleanProblem)) {
                return this.solveGeometry(cleanProblem);
            } else if (this.isTrigonometry(cleanProblem)) {
                return this.solveTrigonometry(cleanProblem);
            } else if (this.isCalculus(cleanProblem)) {
                return this.solveCalculus(cleanProblem);
            } else {
                return this.solveGeneral(cleanProblem);
            }
        } catch (error) {
            return {
                type: 'error',
                answer: 'Не удалось решить задачу',
                steps: [`Ошибка: ${error.message}`],
                explanation: 'Проверьте правильность ввода математического выражения'
            };
        }
    }

    // ==================== ОПРЕДЕЛЕНИЕ ТИПА ЗАДАЧИ ====================
    isEquation(str) {
        return str.includes('=') && (str.includes('x') || str.includes('y') || str.includes('z'));
    }

    isExpression(str) {
        const mathSymbols = ['+', '-', '*', '/', '^', '√', 'sin', 'cos', 'tan', 'log', 'ln'];
        return mathSymbols.some(symbol => str.includes(symbol));
    }

    isGeometry(str) {
        const geometryTerms = ['площадь', 'объем', 'периметр', 'диагональ', 'угол', 'радиус', 'диаметр', 'окружность'];
        return geometryTerms.some(term => str.includes(term));
    }

    isTrigonometry(str) {
        const trigTerms = ['sin', 'cos', 'tan', 'ctg', 'sinus', 'cosinus', 'тангенс', 'синус', 'косинус'];
        return trigTerms.some(term => str.includes(term));
    }

    isCalculus(str) {
        const calculusTerms = ['производная', 'интеграл', 'дифференциал', 'предел', 'derivative', 'integral'];
        return calculusTerms.some(term => str.includes(term));
    }

    // ==================== РЕШЕНИЕ УРАВНЕНИЙ ====================
    solveEquation(equation) {
        // Убираем пробелы
        equation = equation.replace(/\s+/g, '');
        
        const sides = equation.split('=');
        const left = sides[0];
        const right = sides[1];
        
        // ЛИНЕЙНЫЕ УРАВНЕНИЯ: ax + b = c
        if (this.isLinearEquation(equation)) {
            return this.solveLinearEquation(equation);
        }
        
        // КВАДРАТНЫЕ УРАВНЕНИЯ: ax² + bx + c = 0
        if (this.isQuadraticEquation(equation)) {
            return this.solveQuadraticEquation(equation);
        }
        
        // СИСТЕМЫ УРАВНЕНИЙ
        if (equation.includes('{') || equation.includes(',') && (equation.includes('x') && equation.includes('y'))) {
            return this.solveSystemOfEquations(equation);
        }
        
        // ДРОБНЫЕ УРАВНЕНИЯ
        if (equation.includes('/')) {
            return this.solveRationalEquation(equation);
        }
        
        // ПОКАЗАТЕЛЬНЫЕ УРАВНЕНИЯ
        if (equation.includes('^')) {
            return this.solveExponentialEquation(equation);
        }
        
        return {
            type: 'equation',
            answer: 'Сложное уравнение - требуется ручное решение',
            steps: ['Это сложное уравнение, которое требует дополнительного анализа'],
            explanation: 'Рекомендуется использовать математические пакеты или обратиться к преподавателю'
        };
    }

    isLinearEquation(eq) {
        return eq.includes('x') && !eq.includes('^') && !eq.includes('x*x');
    }

    solveLinearEquation(eq) {
        const sides = eq.split('=');
        let left = sides[0];
        let right = sides[1];
        
        // Преобразуем уравнение к виду ax + b = 0
        // Переносим все в левую часть
        const terms = [];
        
        // Собираем все члены с x
        let a = 0;
        const xMatches = left.match(/([+-]?\d*\.?\d*)x/g) || [];
        xMatches.forEach(match => {
            let coeff = match.replace('x', '');
            if (coeff === '' || coeff === '+') coeff = 1;
            if (coeff === '-') coeff = -1;
            a += parseFloat(coeff);
        });
        
        // Собираем свободные члены
        let b = 0;
        const numberMatches = left.match(/([+-]?\d+\.?\d*)(?![\d.]*x)/g) || [];
        numberMatches.forEach(match => {
            b += parseFloat(match);
        });
        
        // Учитываем правую часть
        const rightNumbers = right.match(/([+-]?\d+\.?\d*)/g) || [];
        rightNumbers.forEach(match => {
            b -= parseFloat(match);
        });
        
        // Решаем: ax + b = 0 → x = -b/a
        if (a === 0) {
            return {
                type: 'linear_equation',
                answer: b === 0 ? 'Бесконечное множество решений' : 'Нет решений',
                steps: [
                    `Уравнение: ${eq}`,
                    `После преобразований: ${a}x + ${b} = 0`,
                    `Коэффициент a = 0`,
                    b === 0 ? 'Уравнение превращается в 0 = 0' : 'Уравнение противоречиво'
                ],
                explanation: 'Линейное уравнение имеет решение только если коэффициент при x не равен 0'
            };
        }
        
        const solution = -b / a;
        
        return {
            type: 'linear_equation',
            answer: `x = ${solution.toFixed(4)}`,
            steps: [
                `Исходное уравнение: ${eq}`,
                `Переносим все в левую часть: ${a}x + ${b} = 0`,
                `Изолируем x: ${a}x = ${-b}`,
                `Делим на коэффициент при x: x = ${-b} / ${a}`,
                `Вычисляем: x = ${solution.toFixed(4)}`
            ],
            explanation: 'Линейные уравнения решаются путем переноса констант и деления на коэффициент при переменной',
            verification: `Проверка: подставляем x = ${solution.toFixed(4)} в исходное уравнение`
        };
    }

    isQuadraticEquation(eq) {
        return eq.includes('x^2') || eq.includes('x²') || eq.includes('x*x');
    }

    solveQuadraticEquation(eq) {
        // Приводим к стандартному виду: ax² + bx + c = 0
        eq = eq.replace('x²', 'x^2').replace('x*x', 'x^2');
        
        const sides = eq.split('=');
        let left = sides[0];
        let right = sides[1] || '0';
        
        // Извлекаем коэффициенты
        let a = 0, b = 0, c = 0;
        
        // Коэффициент a (при x²)
        const aMatch = left.match(/([+-]?\d*\.?\d*)x\^2/);
        if (aMatch) {
            a = aMatch[1] === '' || aMatch[1] === '+' ? 1 : 
                aMatch[1] === '-' ? -1 : parseFloat(aMatch[1]);
        }
        
        // Коэффициент b (при x)
        const bMatch = left.match(/x\^2([+-]?\d*\.?\d*)x/);
        if (bMatch) {
            b = bMatch[1] === '' || bMatch[1] === '+' ? 1 : 
                bMatch[1] === '-' ? -1 : parseFloat(bMatch[1]);
        } else {
            const bMatch2 = left.match(/([+-]?\d*\.?\d*)x(?!\^)/);
            if (bMatch2 && !bMatch2[0].includes('^')) {
                b = bMatch2[1] === '' || bMatch2[1] === '+' ? 1 : 
                    bMatch2[1] === '-' ? -1 : parseFloat(bMatch2[1]);
            }
        }
        
        // Коэффициент c (свободный член)
        const numberTerms = left.match(/([+-]?\d+\.?\d*)(?![x\d.])/g) || [];
        numberTerms.forEach(term => {
            if (!term.includes('x')) {
                c += parseFloat(term);
            }
        });
        
        // Учитываем правую часть
        const rightNumbers = right.match(/([+-]?\d+\.?\d*)/g) || [];
        rightNumbers.forEach(num => {
            c -= parseFloat(num);
        });
        
        // Вычисляем дискриминант
        const D = b * b - 4 * a * c;
        
        const steps = [
            `Исходное уравнение: ${eq}`,
            `Стандартный вид: ${a}x² + ${b}x + ${c} = 0`,
            `Дискриминант D = b² - 4ac = ${b}² - 4·${a}·${c} = ${D}`
        ];
        
        if (D > 0) {
            const x1 = (-b + Math.sqrt(D)) / (2 * a);
            const x2 = (-b - Math.sqrt(D)) / (2 * a);
            
            steps.push(`D > 0, два различных корня`);
            steps.push(`x₁ = (-b + √D) / 2a = (${-b} + √${D}) / ${2*a}`);
            steps.push(`x₁ = ${x1.toFixed(4)}`);
            steps.push(`x₂ = (-b - √D) / 2a = (${-b} - √${D}) / ${2*a}`);
            steps.push(`x₂ = ${x2.toFixed(4)}`);
            
            return {
                type: 'quadratic_equation',
                answer: `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`,
                steps: steps,
                explanation: 'Квадратное уравнение имеет два действительных корня при положительном дискриминанте',
                discriminant: D
            };
            
        } else if (D === 0) {
            const x = -b / (2 * a);
            
            steps.push(`D = 0, один корень (кратности 2)`);
            steps.push(`x = -b / 2a = ${-b} / ${2*a}`);
            steps.push(`x = ${x.toFixed(4)}`);
            
            return {
                type: 'quadratic_equation',
                answer: `x = ${x.toFixed(4)} (двойной корень)`,
                steps: steps,
                explanation: 'Квадратное уравнение имеет один корень кратности 2 при нулевом дискриминанте',
                discriminant: D
            };
            
        } else {
            const realPart = -b / (2 * a);
            const imaginaryPart = Math.sqrt(-D) / (2 * a);
            
            steps.push(`D < 0, два комплексных корня`);
            steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
            steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
            
            return {
                type: 'quadratic_equation',
                answer: `x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i, x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`,
                steps: steps,
                explanation: 'Квадратное уравнение имеет два комплексно-сопряженных корня при отрицательном дискриминанте',
                discriminant: D
            };
        }
    }

    solveSystemOfEquations(system) {
        // Простая система 2x2
        const equations = system.split(',').map(eq => eq.trim());
        
        if (equations.length === 2) {
            // Пытаемся решить систему вида:
            // a1x + b1y = c1
            // a2x + b2y = c2
            
            const coeffs = [];
            for (let eq of equations) {
                const a = this.extractCoefficient(eq, 'x');
                const b = this.extractCoefficient(eq, 'y');
                const c = this.extractConstant(eq);
                coeffs.push({ a, b, c });
            }
            
            const [eq1, eq2] = coeffs;
            const determinant = eq1.a * eq2.b - eq2.a * eq1.b;
            
            if (determinant !== 0) {
                const x = (eq1.c * eq2.b - eq2.c * eq1.b) / determinant;
                const y = (eq1.a * eq2.c - eq2.a * eq1.c) / determinant;
                
                return {
                    type: 'system_of_equations',
                    answer: `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`,
                    steps: [
                        `Система уравнений:`,
                        `1) ${eq1.a}x + ${eq1.b}y = ${eq1.c}`,
                        `2) ${eq2.a}x + ${eq2.b}y = ${eq2.c}`,
                        `Определитель системы: Δ = ${eq1.a}·${eq2.b} - ${eq2.a}·${eq1.b} = ${determinant}`,
                        `Δx = ${eq1.c}·${eq2.b} - ${eq2.c}·${eq1.b} = ${eq1.c * eq2.b - eq2.c * eq1.b}`,
                        `Δy = ${eq1.a}·${eq2.c} - ${eq2.a}·${eq1.c} = ${eq1.a * eq2.c - eq2.a * eq1.c}`,
                        `x = Δx/Δ = ${(eq1.c * eq2.b - eq2.c * eq1.b)} / ${determinant} = ${x.toFixed(4)}`,
                        `y = Δy/Δ = ${(eq1.a * eq2.c - eq2.a * eq1.c)} / ${determinant} = ${y.toFixed(4)}`
                    ],
                    explanation: 'Система линейных уравнений решается методом Крамера',
                    method: 'cramer'
                };
            }
        }
        
        return {
            type: 'system_of_equations',
            answer: 'Требуется ручное решение или специализированный инструмент',
            steps: ['Сложная система уравнений'],
            explanation: 'Для сложных систем используйте матричные методы или математические пакеты'
        };
    }

    // ==================== РЕШЕНИЕ ВЫРАЖЕНИЙ ====================
    solveExpression(expr) {
        try {
            // Безопасное вычисление выражений
            const result = this.safeEval(expr);
            
            return {
                type: 'expression',
                answer: result,
                steps: [
                    `Выражение: ${expr}`,
                    `Порядок вычислений:`,
                    `1. Скобки: ()`,
                    `2. Степени: ^`,
                    `3. Умножение и деление: * /`,
                    `4. Сложение и вычитание: + -`,
                    `Результат: ${result}`
                ],
                explanation: 'Математические выражения вычисляются по стандартному порядку операций'
            };
        } catch (error) {
            return {
                type: 'expression',
                answer: 'Ошибка вычисления',
                steps: [`Не удалось вычислить: ${expr}`, `Ошибка: ${error.message}`],
                explanation: 'Проверьте синтаксис математического выражения'
            };
        }
    }

    safeEval(expr) {
        // Заменяем математические функции
        expr = expr.replace(/sin\(/g, 'Math.sin(')
                  .replace(/cos\(/g, 'Math.cos(')
                  .replace(/tan\(/g, 'Math.tan(')
                  .replace(/sqrt\(/g, 'Math.sqrt(')
                  .replace(/log\(/g, 'Math.log10(')
                  .replace(/ln\(/g, 'Math.log(')
                  .replace(/π/g, 'Math.PI')
                  .replace(/pi/g, 'Math.PI')
                  .replace(/e/g, 'Math.E')
                  .replace(/\^/g, '**');
        
        // Удаляем все небезопасные символы
        const safeExpr = expr.replace(/[^0-9+\-*/().\sMath,sincoetaqrlgPIEd]/g, '');
        
        try {
            return eval(safeExpr);
        } catch {
            throw new Error('Некорректное математическое выражение');
        }
    }

    // ==================== ГЕОМЕТРИЯ ====================
    solveGeometry(problem) {
        const geometryDB = {
            // Площади
            'площадь квадрата': {
                formula: 'S = a²',
                example: 'a=5 → S=25',
                solve: (params) => params.a * params.a
            },
            'площадь прямоугольника': {
                formula: 'S = a * b',
                example: 'a=4, b=6 → S=24',
                solve: (params) => params.a * params.b
            },
            'площадь треугольника': {
                formula: 'S = ½ * a * h',
                example: 'a=6, h=4 → S=12',
                solve: (params) => 0.5 * params.a * params.h
            },
            'площадь круга': {
                formula: 'S = πr²',
                example: 'r=3 → S≈28.27',
                solve: (params) => Math.PI * params.r * params.r
            },
            
            // Объемы
            'объем куба': {
                formula: 'V = a³',
                example: 'a=3 → V=27',
                solve: (params) => params.a * params.a * params.a
            },
            'объем шара': {
                formula: 'V = (4/3)πr³',
                example: 'r=2 → V≈33.51',
                solve: (params) => (4/3) * Math.PI * Math.pow(params.r, 3)
            },
            
            // Теоремы
            'теорема пифагора': {
                formula: 'c² = a² + b²',
                example: 'a=3, b=4 → c=5',
                solve: (params) => Math.sqrt(params.a*params.a + params.b*params.b)
            }
        };
        
        // Ищем ключевое слово
        for (const [key, data] of Object.entries(geometryDB)) {
            if (problem.includes(key)) {
                // Пытаемся извлечь числа из задачи
                const numbers = problem.match(/\d+\.?\d*/g) || [1];
                const params = { a: parseFloat(numbers[0]) || 1, b: parseFloat(numbers[1]) || 1, r: parseFloat(numbers[0]) || 1, h: parseFloat(numbers[1]) || 1 };
                
                const result = data.solve(params);
                
                return {
                    type: 'geometry',
                    answer: result.toFixed(4),
                    steps: [
                        `Геометрическая задача: ${key}`,
                        `Формула: ${data.formula}`,
                        `Подставляем значения: ${JSON.stringify(params)}`,
                        `Вычисляем: ${data.formula.replace(/[a-z]/g, (m) => params[m] || m)}`,
                        `Результат: ${result.toFixed(4)}`
                    ],
                    explanation: `Формула для ${key}: ${data.formula}`,
                    formula: data.formula
                };
            }
        }
        
        return {
            type: 'geometry',
            answer: 'Геометрическая задача не распознана',
            steps: ['Введите конкретную геометрическую задачу'],
            explanation: 'Пример: "площадь квадрата со стороной 5" или "объем шара радиусом 3"'
        };
    }

    // ==================== ТРИГОНОМЕТРИЯ ====================
    solveTrigonometry(problem) {
        // Извлекаем угол
        const angleMatch = problem.match(/\d+\.?\d*/);
        const angle = angleMatch ? parseFloat(angleMatch[0]) : 30;
        const rad = angle * Math.PI / 180;
        
        if (problem.includes('sin') || problem.includes('синус')) {
            const result = Math.sin(rad);
            return {
                type: 'trigonometry',
                answer: `sin(${angle}°) = ${result.toFixed(4)}`,
                steps: [
                    `sin(${angle}°)`,
                    `Переводим в радианы: ${angle}° * π/180 = ${rad.toFixed(4)} рад`,
                    `sin(${rad.toFixed(4)}) = ${result.toFixed(4)}`
                ],
                explanation: 'Синус угла в прямоугольном треугольнике - отношение противолежащего катета к гипотенузе'
            };
        }
        
        if (problem.includes('cos') || problem.includes('косинус')) {
            const result = Math.cos(rad);
            return {
                type: 'trigonometry',
                answer: `cos(${angle}°) = ${result.toFixed(4)}`,
                steps: [
                    `cos(${angle}°)`,
                    `Переводим в радианы: ${angle}° * π/180 = ${rad.toFixed(4)} рад`,
                    `cos(${rad.toFixed(4)}) = ${result.toFixed(4)}`
                ],
                explanation: 'Косинус угла в прямоугольном треугольнике - отношение прилежащего катета к гипотенузе'
            };
        }
        
        return {
            type: 'trigonometry',
            answer: 'Тригонометрическая функция не распознана',
            steps: ['Примеры: "sin 30", "cos 45", "tan 60"'],
            explanation: 'Доступные функции: sin, cos, tan, ctg'
        };
    }

    // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
    extractCoefficient(expr, variable) {
        const regex = new RegExp(`([+-]?\\d*\\.?\\d*)${variable}`);
        const match = expr.match(regex);
        if (match) {
            const coeff = match[1];
            if (coeff === '' || coeff === '+') return 1;
            if (coeff === '-') return -1;
            return parseFloat(coeff);
        }
        return 0;
    }

    extractConstant(expr) {
        // Извлекаем числа без переменных
        const numbers = expr.match(/([+-]?\d+\.?\d*)(?![x\d.])/g) || [];
        let sum = 0;
        numbers.forEach(num => {
            sum += parseFloat(num);
        });
        return sum;
    }

    solveGeneral(problem) {
        // Общий решатель для любых задач
        const responses = [
            `Я проанализировал задачу: "${problem}"`,
            `Это математическая задача, требующая решения`,
            `Рекомендую:`,
            `1. Определить тип задачи (уравнение, выражение, геометрия)`,
            `2. Записать известные данные`,
            `3. Применить соответствующую формулу`,
            `4. Проверить решение`
        ];
        
        return {
            type: 'general',
            answer: 'Требуется более специфичный запрос',
            steps: responses,
            explanation: 'Уточните тип математической задачи для точного решения'
        };
    }

    // ==================== ИСТОРИЯ И СТАТИСТИКА ====================
    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ГЛОБАЛЬНОГО МАТЕМАТИЧЕСКОГО ИИ ====================
const mathAI = new MathAI();

// ==================== ОБНОВЛЕННАЯ ФУНКЦИЯ РЕШЕНИЯ МАТЕМАТИКИ ====================
function solveMathProblem() {
    const problem = document.getElementById('mathInput').value.trim();
    const resultDiv = document.getElementById('mathResult');
    
    if (!problem) {
        showResult(resultDiv, '✏️ Введите математическую задачу', 'error');
        return;
    }
    
    showLoading(resultDiv, '🧠 ИИ анализирует задачу...');
    
    setTimeout(() => {
        try {
            const solution = mathAI.solve(problem);
            
            let solutionHTML = `
                <div class="solution-container">
                    <div class="solution-header ${solution.type}">
                        <div class="solution-type">
                            <i class="${getSolutionIcon(solution.type)}"></i>
                            ${getSolutionTypeName(solution.type)}
                        </div>
                        <h4>${problem}</h4>
                    </div>
                    
                    <div class="solution-answer">
                        <div class="answer-label">Ответ:</div>
                        <div class="answer-value">${solution.answer}</div>
                    </div>
                    
                    <div class="solution-steps">
                        <h5><i class="fas fa-footsteps"></i> Пошаговое решение:</h5>
                        <ol>
                            ${solution.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="solution-explanation">
                        <h5><i class="fas fa-lightbulb"></i> Объяснение:</h5>
                        <p>${solution.explanation}</p>
                    </div>
                    
                    ${solution.formula ? `
                    <div class="solution-formula">
                        <h5><i class="fas fa-square-root-variable"></i> Формула:</h5>
                        <code>${solution.formula}</code>
                    </div>
                    ` : ''}
                    
                    ${solution.verification ? `
                    <div class="solution-verification">
                        <h5><i class="fas fa-check-double"></i> Проверка:</h5>
                        <p>${solution.verification}</p>
                    </div>
                    ` : ''}
                    
                    <div class="solution-tips">
                        <h5><i class="fas fa-graduation-cap"></i> Советы:</h5>
                        <p>${getMathTips(problem)}</p>
                    </div>
                </div>
            `;
            
            showResult(resultDiv, solutionHTML, 'success');
            
            // Анимация появления
            resultDiv.style.animation = 'none';
            setTimeout(() => {
                resultDiv.style.animation = 'fadeIn 0.6s ease';
            }, 10);
            
        } catch (error) {
            showResult(resultDiv, `
                <div class="solution-error">
                    <div class="error-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h4>Ошибка решения</h4>
                    </div>
                    <p>${error.message}</p>
                    
                    <div class="help-section">
                        <h5>📚 Примеры правильного ввода:</h5>
                        <div class="examples-grid">
                            <div class="example-card">
                                <h6>Уравнения</h6>
                                <ul>
                                    <li>2x + 5 = 13</li>
                                    <li>x^2 - 4 = 0</li>
                                    <li>3(x-2) = 9</li>
                                </ul>
                            </div>
                            <div class="example-card">
                                <h6>Выражения</h6>
                                <ul>
                                    <li>2 + 3 * 4</li>
                                    <li>sqrt(16) + 5</li>
                                    <li>sin(30) + cos(60)</li>
                                </ul>
                            </div>
                            <div class="example-card">
                                <h6>Геометрия</h6>
                                <ul>
                                    <li>площадь квадрата 5</li>
                                    <li>объем шара радиус 3</li>
                                    <li>теорема пифагора 3 4</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `, 'error');
        }
    }, 800);
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function getSolutionIcon(type) {
    const icons = {
        'linear_equation': 'fas fa-grip-lines',
        'quadratic_equation': 'fas fa-superscript',
        'system_of_equations': 'fas fa-th',
        'expression': 'fas fa-calculator',
        'geometry': 'fas fa-shapes',
        'trigonometry': 'fas fa-wave-square',
        'calculus': 'fas fa-chart-line',
        'general': 'fas fa-brain',
        'error': 'fas fa-exclamation-circle'
    };
    return icons[type] || 'fas fa-question-circle';
}

function getSolutionTypeName(type) {
    const names = {
        'linear_equation': 'Линейное уравнение',
        'quadratic_equation': 'Квадратное уравнение',
        'system_of_equations': 'Система уравнений',
        'expression': 'Математическое выражение',
        'geometry': 'Геометрическая задача',
        'trigonometry': 'Тригонометрия',
        'calculus': 'Математический анализ',
        'general': 'Общая задача',
        'error': 'Ошибка'
    };
    return names[type] || 'Математическая задача';
}

function getMathTips(problem) {
    const tips = {
        'линейное': 'Для линейных уравнений: изолируйте переменную, перенося все числа в другую сторону.',
        'квадратное': 'Для квадратных уравнений используйте формулу дискриминанта: D = b² - 4ac.',
        'система': 'Для систем уравнений используйте метод подстановки или сложения.',
        'геометрия': 'В геометрических задачах всегда рисуйте схему и отмечайте известные данные.',
        'тригонометрия': 'Тригонометрические функции работают с углами в радианах. 180° = π радиан.',
        'выражение': 'Помните порядок операций: скобки → степени → умножение/деление → сложение/вычитание.',
        'общее': 'Разбейте сложную задачу на несколько простых шагов. Проверяйте каждый шаг решения.'
    };
    
    if (problem.includes('x=') || problem.includes('x =')) return tips.линейное;
    if (problem.includes('x^2') || problem.includes('x²')) return tips.квадратное;
    if (problem.includes('площадь') || problem.includes('объем')) return tips.геометрия;
    if (problem.includes('sin') || problem.includes('cos')) return tips.тригонометрия;
    
    return tips.общее;
}

// ==================== ПРИМЕРЫ ТЕСТОВЫХ ЗАДАЧ ====================
function testMathSolver() {
    const testProblems = [
        '2x + 5 = 13',
        'x^2 - 4 = 0',
        'площадь квадрата 5',
        'sin 30',
        '2 + 3 * 4',
        '3(x-2) = 9',
        'x + y = 10, 2x - y = 5',
        'объем шара радиус 3'
    ];
    
    console.log('🧪 Тестирование математического ИИ:');
    testProblems.forEach((problem, i) => {
        console.log(`\n${i+1}. "${problem}"`);
        const solution = mathAI.solve(problem);
        console.log(`   Ответ: ${solution.answer}`);
    });
}

// ==================== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧮 Математический ИИ Edumaster загружен и готов к работе!');
    
    // Запускаем тест при загрузке (можно отключить)
    // testMathSolver();
    
    // Добавляем обработчики для примеров
    document.querySelectorAll('.example-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const example = this.textContent;
            document.getElementById('mathInput').value = example;
            solveMathProblem();
        });
    });
    
    // Обработчик нажатия Enter в поле ввода
    document.getElementById('mathInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            solveMathProblem();
        }
    });
    
    // Показываем приветственное сообщение
    setTimeout(() => {
        if (!sessionStorage.getItem('math_ai_intro')) {
            showNotification('🧮 Математический ИИ готов! Вводите уравнения, задачи по геометрии, тригонометрию...', 'info');
            sessionStorage.setItem('math_ai_intro', 'true');
        }
    }, 1000);
});

// ==================== ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ МАТЕМАТИЧЕСКОГО СОЛВЕРА ====================
const mathStyles = document.createElement('style');
mathStyles.textContent = `
    .solution-container {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    
    .solution-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e2e8f0;
    }
    
    .solution-header.linear_equation { border-bottom-color: #3b82f6; }
    .solution-header.quadratic_equation { border-bottom-color: #8b5cf6; }
    .solution-header.geometry { border-bottom-color: #10b981; }
    .solution-header.trigonometry { border-bottom-color: #f59e0b; }
    
    .solution-type {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #f8fafc;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .solution-answer {
        background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    
    .answer-label {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .answer-value {
        font-size: 2rem;
        font-weight: 700;
        color: #0f172a;
        font-family: 'Courier New', monospace;
    }
    
    .solution-steps ol {
        padding-left: 1.5rem;
        margin: 1rem 0;
    }
    
    .solution-steps li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
        color: #334155;
    }
    
    .solution-explanation {
        background: rgba(59, 130, 246, 0.05);
        padding: 1.25rem;
        border-radius: 10px;
        margin: 1.5rem 0;
        border-left: 4px solid #3b82f6;
    }
    
    .solution-formula code {
        background: #1e293b;
        color: #f8fafc;
        padding: 1rem;
        border-radius: 8px;
        display: block;
        font-family: 'Courier New', monospace;
        font-size: 1.1rem;
        margin: 0.5rem 0;
    }
    
    .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .example-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border: 2px solid #e2e8f0;
    }
    
    .example-card h6 {
        color: #0f172a;
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }
    
    .example-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .example-card li {
        padding: 0.5rem 0;
        color: #475569;
        border-bottom: 1px solid #f1f5f9;
        font-size: 0.9rem;
    }
    
    .example-card li:last-child {
        border-bottom: none;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(mathStyles);

// Экспортируем функции для глобального использования
window.solveMathProblem = solveMathProblem;
window.testMathSolver = testMathSolver;
window.mathAI = mathAI;
