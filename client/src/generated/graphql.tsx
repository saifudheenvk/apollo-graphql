import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthData = {
  __typename?: 'AuthData';
  user: UserType;
  tokenExpiration: Scalars['String'];
};

export type CreateEventType = {
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['String'];
  date: Scalars['DateTime'];
};

export type CreateUserType = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type EventType = {
  __typename?: 'EventType';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['String'];
  date: Scalars['DateTime'];
  creator: UserType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserType;
  login: AuthData;
  createEvent: EventType;
};


export type MutationCreateUserArgs = {
  userInput: CreateUserType;
};


export type MutationLoginArgs = {
  loginInput: CreateUserType;
};


export type MutationCreateEventArgs = {
  eventInput: CreateEventType;
};

export type Query = {
  __typename?: 'Query';
  getMyDetails?: Maybe<UserType>;
  users: Array<UserType>;
  events: Array<EventType>;
};

export type UserType = {
  __typename?: 'UserType';
  _id: Scalars['ID'];
  email: Scalars['String'];
  createdEvents: Array<EventType>;
};

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserType;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserType' }
    & Pick<UserType, 'email' | '_id'>
  ) }
);


export const CreateUserDocument = gql`
    mutation createUser($userInput: CreateUserType!) {
  createUser(userInput: $userInput) {
    email
    _id
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};