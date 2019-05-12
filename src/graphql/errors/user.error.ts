import { ApolloError } from 'apollo-server-koa';

export enum UserErrorCode {
  EXISTS_EMAIL = 'EXISTS_EMAIL',
  NOT_FOUND_USER = 'NOT_FOUND_USER'
}

export const existsEmail = (
  message: string = '해당 이메일을 사용하는 사용자가 이미 존재합니다'
) => {
  throw new ApolloError(message, UserErrorCode.EXISTS_EMAIL);
};

export const notFoundUser = (message: string = '사용자를 찾을 수 없습니다') => {
  throw new ApolloError(message, UserErrorCode.NOT_FOUND_USER);
};
