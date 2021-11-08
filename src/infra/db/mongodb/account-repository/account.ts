import { MongoHelper } from '../helpers/mongo-helper'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData) // Retorna apenas o id do registro criado

    const { insertedId: id } = result
    const accountById = await accountCollection.findOne({ _id: id })

    const { _id, ...accountWithoutId } = accountById

    const account = Object.assign(
      {},
      accountWithoutId,
      { id: _id.toHexString() }
    ) as AccountModel

    return account
  }
}
