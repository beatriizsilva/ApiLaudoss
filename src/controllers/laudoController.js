const Laudo = require('../models/laudo');

// Criar um novo laudo
exports.createLaudo = async (req, res) => {
  const { data, crm, texto, arquivo } = req.body;
  // TODO usar o Zod para validar o DTO de entrada
  if (!data || !crm || !texto || !arquivo) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const laudo = new Laudo({ data, crm, texto, arquivo });
    await laudo.save();
    res.status(201).location(`/laudos/${laudo._id}`).send({ id: laudo._id });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar o laudo.', error });
  }
};

// Listar todos os laudos (máximo 50)
// exports.getAllLaudos = async (req, res) => {
//   try {
//     // TODO pensar em um modo de paginação
//     // -> Retorna total de elementos, total de páginas, página atual e total de elementos na página
//     const laudos = await Laudo.find().limit(50);
//     res.status(200).json(laudos);
//   } catch (error) {
//     res.status(500).send({ message: 'Erro ao listar laudos.', error });
//   }
// };

// Buscar laudo por ID
exports.getLaudoById = async (req, res) => {
  const { id } = req.params;
  try {
    const laudo = await Laudo.findById(id);
    if (laudo) {
      res.status(200).json(laudo);
    } else {
      res.status(404).send({ message: 'Laudo não encontrado.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o laudo.', error });
  }
};

// Buscar laudos por termo
// exports.searchLaudos = async (req, res) => {
//   const { t } = req.query;
//   if (!t) {
//     return res.status(400).send({ message: 'Termo de busca é obrigatório.' });
//   }

//   try {
//     const laudos = await Laudo.find({ texto: { $regex: t, $options: 'i' } }).limit(50);
//     res.status(200).json(laudos);
//   } catch (error) {
//     res.status(500).send({ message: 'Erro ao buscar laudos.', error });
//   }
// };
// Função para listar todos os laudos ou buscar pelo termo `t`
exports.searchOrListLaudos = async (req, res) => {
  const { t } = req.query;  // Captura o parâmetro `t`

  try {
    let laudos;

    // Verifica se o parâmetro `t` foi informado mas está vazio
    if (t === "") {
      return res.status(400).send({ message: 'Termo de busca não pode estar vazio.' });
    }

    // Se `t` foi passado, faz a busca no campo `texto`
    if (t) {
      console.log('Buscando laudos com o termo:', t);
      laudos = await Laudo.find({ texto: { $regex: t, $options: 'i' } }).limit(50);
    } else {
      // Se `t` não foi passado, lista todos os laudos
      console.log('Listando todos os laudos');
      laudos = await Laudo.find().limit(50);  // Ajuste o limite conforme necessário
    }

    res.status(200).json(laudos);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar ou listar laudos.', error });
  }
};


// Buscar laudos por termo
exports.searchLaudos = async (req, res) => {
  const { t } = req.query;
  if (!t) {
    return res.status(400).send({ message: 'Termo de busca é obrigatório.' });
  }

  try {
    const laudos = await Laudo.find({ texto: { $regex: t, $options: 'i' } }).limit(50);
    res.status(200).json(laudos);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar laudos.', error });
  }
};
