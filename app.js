const app = document.getElementById('app');

function showSection(name) {
    app.innerHTML = '';
    
    if (name === 'ai') {
        app.innerHTML = `
            <div class="card">
                <h2>🤖 AI Помощник</h2>
                <textarea id="aiIn" rows="4" placeholder="Ваш вопрос..."></textarea>
                <button class="primary-btn" onclick="alert('Голосовой ввод активирован!')">Включить микрофон</button>
            </div>`;
    } 
    else if (name === 'ent') {
        app.innerHTML = `
            <div class="card">
                <h2>🎓 Калькулятор Гранта</h2>
                <input type="number" id="s1" placeholder="Балл ЕНТ">
                <button class="primary-btn" onclick="calc()">Узнать шансы</button>
                <div id="res" class="result-box" style="display:none"></div>
            </div>`;
    }
}

function calc() {
    const val = document.getElementById('s1').value;
    const res = document.getElementById('res');
    res.style.display = 'block';
    res.innerText = val >= 110 ? "Отличный шанс на грант!" : "Нужно еще немного подтянуться.";
}
