import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { email } = await req.body;

  const user = {
    isLoggedIn: true,
    email
  };

  req.session.set('user', user);
  await req.session.save();
  res.json(user);
});
