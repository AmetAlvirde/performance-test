import withSession from '../../lib/session';

const Casham = () => {};

export default withSession(async (req, res) => {
  const { email, password } = await req.body;

  return new Promise(resolve => {
    Casham.login({
      domain: process.env.NEXT_PUBLIC_CASHAM_API,
      email,
      password,
      environment: {
        os: 'IOS',
        device: 'Iphone 9'
      }
    })
      .then(() => {
        res.json({ success: true });
        resolve();
      })
      .catch(err => {
        res.status(401).send({
          error: 'Invalid user or password',
          err
        });
        // if rejected, server dies.
        return resolve();
      });
  });
});
