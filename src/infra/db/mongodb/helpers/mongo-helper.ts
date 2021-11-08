import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient, // Como é um objeto Js, precisa primeiro dar um valor, senão ele entende MongoClient como valor e dá problema

  async connect (): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL) // Em teste, URL gerada pela biblioteca
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
