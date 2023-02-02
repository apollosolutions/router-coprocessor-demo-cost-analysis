import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from '../types/DataSourceContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type BanStatus = {
  __typename?: 'BanStatus';
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type Status = BanStatus | ValidStatus;

export type User = {
  __typename?: 'User';
  friends: Array<User>;
  id: Scalars['ID'];
  status?: Maybe<Status>;
  type?: Maybe<UserType>;
};


export type UserFriendsArgs = {
  first?: InputMaybe<Scalars['Int']>;
};

export enum UserType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type ValidStatus = {
  __typename?: 'ValidStatus';
  idT: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BanStatus: ResolverTypeWrapper<BanStatus>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  Status: ResolversTypes['BanStatus'] | ResolversTypes['ValidStatus'];
  User: ResolverTypeWrapper<Omit<User, 'status'> & { status?: Maybe<ResolversTypes['Status']> }>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UserType: UserType;
  ValidStatus: ResolverTypeWrapper<ValidStatus>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BanStatus: BanStatus;
  ID: Scalars['ID'];
  Query: {};
  Status: ResolversParentTypes['BanStatus'] | ResolversParentTypes['ValidStatus'];
  User: Omit<User, 'status'> & { status?: Maybe<ResolversParentTypes['Status']> };
  Int: Scalars['Int'];
  ValidStatus: ValidStatus;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
}>;

export type CostDirectiveArgs = {
  multipliers?: Maybe<Array<Scalars['String']>>;
  value: Scalars['Int'];
};

export type CostDirectiveResolver<Result, Parent, ContextType = DataSourceContext, Args = CostDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BanStatusResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['BanStatus'] = ResolversParentTypes['BanStatus']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type StatusResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BanStatus' | 'ValidStatus', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<UserFriendsArgs, 'first'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['UserType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ValidStatusResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ValidStatus'] = ResolversParentTypes['ValidStatus']> = ResolversObject<{
  idT?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  BanStatus?: BanStatusResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidStatus?: ValidStatusResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = DataSourceContext> = ResolversObject<{
  cost?: CostDirectiveResolver<any, any, ContextType>;
}>;
