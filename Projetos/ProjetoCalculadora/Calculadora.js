const buttons = document.querySelectorAll('button[name="action"]');
const operators = document.querySelectorAll('button[name="operator"]');
const resultDiv = document.querySelector('#resultado');

// Adiciona um event listener para cada botão de ação
buttons.forEach(button => {
    button.addEventListener('click', () => {
        resultDiv.textContent += button.value;
    });
});

// Adiciona um event listener para cada botão de operador
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        resultDiv.textContent += ' ' + operator.value + ' ';
    });
});

// Adiciona um event listener para o botão de igual
const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    let resultadoView = resultDiv.textContent.split(" ");
    let resultadoFinal;

    // Função para calcular uma operação básica
    const calcular = (a, b, operador) => {
        switch (operador) {
            case '+': return a + b;
            case '-': return a - b;
            case 'x': return a * b;
            case '÷': return a / b;
            default: return undefined;
        }
    };

    // Função para resolver multiplicação e divisão
    const resolverMultiplicacaoDivisao = (expressao) => {
        let i = 0;
        while (i < expressao.length) {
            if (expressao[i] === 'x' || expressao[i] === '÷') {
                let a = parseFloat(expressao[i - 1]);
                let b = parseFloat(expressao[i + 1]);
                if (!isNaN(a) && !isNaN(b)) {
                    calcular(a, b, expressao[i]);
                    expressao[i - 1] = calcular(a, b, expressao[i]);
                    expressao.splice(i, 2);
                } else {
                    return ['Error'];
                }
            } else {
                i++;
            }
        }
        return expressao;
    };

    // Função para resolver adição e subtração
    const resolverAdicaoSubtracao = (expressao) => {
        let i = 0;
        while (i < expressao.length) {
            if (expressao[i] === '+' || expressao[i] === '-') {
                let a = parseFloat(expressao[i - 1]);
                let b = parseFloat(expressao[i + 1]);
                if (!isNaN(a) && !isNaN(b)) {
                    expressao[i - 1] = calcular(a, b, expressao[i]);
                    expressao.splice(i, 2);
                } else {
                    return ['Error'];
                }
            } else {
                i++;
            }
        }
        return expressao;
    };

    // Resolve multiplicações e divisões
    resultadoView = resolverMultiplicacaoDivisao(resultadoView);

    // Resolve adições e subtrações
    resultadoView = resolverAdicaoSubtracao(resultadoView);

    // Define o resultado final
    if (resultadoView.length === 1) {
        resultadoFinal = resultadoView[0];
    } else {
        resultadoFinal = 'Error';
    }

    // Atualiza o resultado na div
    resultDiv.textContent = resultadoFinal !== undefined ? resultadoFinal : 'Error';
});

// Adiciona um event listener para o botão de reset
const reset = document.querySelector("#reset");
reset.addEventListener('click', () => {
    resultDiv.textContent = '';
});
