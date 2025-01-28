import fs from 'fs';
import os from 'os';
import path from 'path';
import { DotEnvConfigProvider } from './DotEnvConfigProvider';

const FAKE_PATH = path.join(os.tmpdir(), 'fake');

describe('Configuration avec DotEnv', () => {
  const dotEnvPath = path.join(FAKE_PATH, '.env.test');

  const validEnv = `
    PORT=9000
  `;

  beforeEach(() => {
    fs.rmSync(FAKE_PATH, { force: true, recursive: true });
    fs.mkdirSync(FAKE_PATH);
  });

  test.each`
    field
    ${'PORT'}
  `('La valeur "$field" doit être renseignée', ({ field }) => {
    const values = {
      PORT: 9000,
      [field]: '',
    };
    fs.writeFileSync(dotEnvPath, `
      PORT=${values.PORT}
    `);
    expect(() => new DotEnvConfigProvider(dotEnvPath).get()).toThrow(`Empty ${field} value in ${dotEnvPath}.`);
  });


  test('Récupération de la configuration', () => {
    fs.writeFileSync(dotEnvPath, validEnv);
    const dotEnvProvider = new DotEnvConfigProvider(dotEnvPath);
    expect(dotEnvProvider.get()).toEqual({
      port: 9000,
    });
  });
});
