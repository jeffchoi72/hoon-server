import { Resolver, Query } from 'type-graphql';
import { Service } from 'typedi';
import { Test } from './test.type';

@Resolver(of => Test)
@Service()
export default class TestResolver {
  constructor() {}

  @Query(() => Test)
  public test() {
    return {
      success: true,
      message: 'test'
    };
  }
}
