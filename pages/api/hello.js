import { apiHandler } from '../../helpers/api';
export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.send('Hello Peeps!');
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
