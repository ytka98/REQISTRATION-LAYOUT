import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';
import resLocals from './middlewares/resLocals';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const FileStore = store(session);

app.use(session({
  store: new SessionFileStore({}),
  secret: 'lalala',
  name: 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(resLocals);
app.use('/api/auth', apiAuthRouter);

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
