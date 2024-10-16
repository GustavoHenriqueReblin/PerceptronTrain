import { utils, writeFile } from 'xlsx';

class Perceptron {
    constructor(inputSize, learningRate = 0.01) {
        this.weights = new Array(inputSize).fill(1); // Inicializa os pesos com 1
        this.bias = -1; // Inicializa o bias com -1
        this.learningRate = learningRate; // Taxa de aprendizado, normalmente 0.01
        this.trainingLog = []; // Armazena os resultados para exportar a planilha
    }
 
    // Função de ativação
    activationFunction(sum) {
        return sum > 0 ? 1 : -1;
    }
 
    // Função para calcular a saída
    predict(inputs) {
        // Soma ponderada das entradas + bias
        let sum = inputs.reduce((acc, input, i) => acc + input * this.weights[i], this.bias);
        return this.activationFunction(sum);
    }
 
    // Treinamento do perceptron
    train(trainingData, generations) {
        for (let generation = 0; generation < generations; generation++) {
            trainingData.forEach(data => {
                const { inputs, expected } = data;
                const prediction = this.predict(inputs);
       
                // Calcula o erro (saída esperada - saída calculada)
                const error = expected - prediction;
       
                // Ajusta os pesos e o bias se houver erro
                this.weights = this.weights.map(
                    (w, i) => w + this.learningRate * error * inputs[i]
                );
                this.bias += this.learningRate * error; // Ajuste do bias

                // Salva no array para exportar no final
                this.trainingLog.push({
                    generation,
                    inputs: inputs.join(','),
                    expected,
                    prediction,
                    weights: this.weights.join(','),
                    bias: this.bias
                });
            });
        }
    }

    // Função para exportar o treinamento para Excel
    exportToExcel(filename) {
        const worksheetData = [
            ['Geração', 'Entradas', 'Esperado', 'Calculado', 'Pesos', 'Bias'], // Cabeçalhos
            ...this.trainingLog.map(log => [
                log.generation,
                log.inputs,
                log.expected,
                log.prediction,
                log.weights,
                log.bias
            ])
        ];

        const worksheet = utils.aoa_to_sheet(worksheetData); // Cria a planilha
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'training'); // Página
       
        // Salva o arquivo Excel
        writeFile(workbook, filename);
    }
}

// Array com as possibilidades
const trainingData = [
    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 6, 5], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 4], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 3], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 2], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 1], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 0], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 6, 9], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 6, 8], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 6, 7], expected: 1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 5, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 4, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 3, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 2, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 1, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 0, 6], expected: -1 },
    { inputs: [4, 1, 4, 4, 0, 9, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 8, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 0, 7, 6], expected: 1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 1, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 2, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 3, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 4, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 5, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 6, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 7, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 8, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 4, 9, 6, 6], expected: 1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 5, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 6, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 7, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 8, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 9, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 4, 0, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 4, 1, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 4, 2, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 4, 3, 0, 6, 6], expected: -1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 5, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 6, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 7, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 8, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 9, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 1, 0, 4, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 1, 4, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 2, 4, 0, 6, 6], expected: -1 },
    { inputs: [4, 1, 3, 4, 0, 6, 6], expected: -1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 2, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 3, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 4, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 5, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 6, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 7, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 8, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 9, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [4, 0, 4, 4, 0, 6, 6], expected: -1 },

    { inputs: [4, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [5, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [6, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [7, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [8, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [9, 1, 4, 4, 0, 6, 6], expected: 1 },
    { inputs: [0, 1, 4, 4, 0, 6, 6], expected: -1 },
    { inputs: [1, 1, 4, 4, 0, 6, 6], expected: -1 },
    { inputs: [2, 1, 4, 4, 0, 6, 6], expected: -1 },
    { inputs: [3, 1, 4, 4, 0, 6, 6], expected: -1 },
];

const perceptron = new Perceptron(7, 0.01); // 7 entradas e taxa de aprendizado 0.01

let result = -1;
while (result === -1) {
    perceptron.train(trainingData, 30); // Treina por 30 gerações

    // Teste após treino
    result = perceptron.predict([4, 1, 4, 4, 0, 6, 6]);
}

perceptron.exportToExcel('perceptron_training.xlsx');
