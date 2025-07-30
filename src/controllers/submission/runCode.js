const axios = require('axios');

const runCode = async (req, res) => {
  const { code, language, input } = req.body;
  try {
    if (!code || !language) {
      return res.status(400).json({ message: 'You need to send code and language' });
    }
    if (input) {
      const result = await axios.post(`${process.env.COMPILER_SERVICE_URL}/api/run`, {
        code,
        language,
        input,
      });
      return res.json({
        message: 'Code ran successfully',
        results: [{
          input,
          output: result.data.output,
          error: result.data.error,
        }],
      });
    }
    res.json({ message: 'No input provided', results: [] });
  } catch (error) {

    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = runCode;