import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { OpenAI } from 'openai';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Configura o multer para aceitar múltiplos campos de arquivo
const upload = multer({ storage: multer.memoryStorage() });
const uploadCampos = upload.fields([
  { name: 'frente', maxCount: 1 },
  { name: 'tras', maxCount: 1 }
]);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/analisar', uploadCampos, async (req, res) => {
  try {
    if (!req.files || !req.files.frente || !req.files.tras) {
      return res.status(400).json({ error: 'Você precisa enviar a foto da frente E do verso da carta.' });
    }

    const fotoFrente = req.files.frente[0];
    const fotoTras = req.files.tras[0];

    const base64Frente = fotoFrente.buffer.toString('base64');
    const base64Tras = fotoTras.buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }, 
      messages: [
        {
          role: "system",
          content: `Você é um avaliador profissional de cartas de TCG. 
          Você receberá duas imagens da MESMA CARTA: a primeira é a FRENTE e a segunda é o VERSO.
          Analise minuciosamente os dois lados (procure por riscos, centramento, desgaste de bordas na frente e atrás, marcas esbranquiçadas ou dobras) e retorne um JSON em português:
          {
            "nome": "Nome exato da carta",
            "jogo": "Nome do TCG",
            "colecao": "Código ou nome da coleção",
            "numero": "Número da carta",
            "raridade": "Raridade estimada",
            "estado_conservacao": "Classificação final baseada em FRENTE e VERSO (Mint, Near Mint, Lightly Played, Moderately Played, Heavily Played, Damaged)",
            "justificativa_estado": "Explicação detalhada combinando os defeitos ou qualidades encontrados na frente e no verso."
          }`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Aqui estão as fotos da frente e do verso desta carta de TCG para sua identificação e avaliação técnica de conservação:" },
            { type: "image_url", image_url: { url: `data:${fotoFrente.mimetype};base64,${base64Frente}` } },
            { type: "image_url", image_url: { url: `data:${fotoTras.mimetype};base64,${base64Tras}` } }
          ],
        },
      ],
    });

    console.log("RESPOSTA BRUTA DA OPENAI:", JSON.stringify(response, null, 2));
    const dadosDaCarta = JSON.parse(response.choices[0].message.content);
    res.json(dadosDaCarta);
  } catch (error) {
    console.error('Erro detalhado:', error.message);
    res.status(500).json({ error: 'Erro ao processar o scanner: ' + error.message });
  }
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
