import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)
  fg.sync('**/src/main/routes/**-routes.ts').map(async file => (await import(`../../../${file}`)).default(router)) // Executa o default de cada arquivo passando o router como parametro (Ex.: export default (router: Router): void => {})
}
