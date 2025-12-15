import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necessário para recriar __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const INPUT_FILENAME = 'exercise_library_export.json';
const CHUNK_SIZE = 200;

const splitJsonFile = () => {
    const filePath = path.join(__dirname, INPUT_FILENAME);

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
        console.error(`Erro: O arquivo '${INPUT_FILENAME}' não foi encontrado em ${__dirname}`);
        return;
    }

    try {
        console.log(`Lendo ${INPUT_FILENAME}...`);

        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);

        if (!Array.isArray(data)) {
            console.error("Erro: O JSON raiz deve ser uma lista (array).");
            return;
        }

        const totalItems = data.length;
        console.log(`Total de exercícios encontrados: ${totalItems}`);

        let partNum = 1;
        for (let i = 0; i < totalItems; i += CHUNK_SIZE) {
            const chunk = data.slice(i, i + CHUNK_SIZE);

            const outputFilename = `exercises_part_${partNum}.json`;
            const outputPath = path.join(__dirname, outputFilename);

            fs.writeFileSync(outputPath, JSON.stringify(chunk, null, 2), 'utf-8');

            console.log(`Criado ${outputFilename} com ${chunk.length} exercícios.`);
            partNum++;
        }

        console.log('Divisão concluída com sucesso!');

    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("Erro: O arquivo fornecido não é um JSON válido.");
        } else {
            console.error(`Ocorreu um erro inesperado: ${error.message}`);
        }
    }
};

splitJsonFile();