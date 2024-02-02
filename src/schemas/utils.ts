import {
  FastifyReply,
  FastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
  RawReplyDefaultExpression,
  ContextConfigDefault,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { FastifySchema } from "fastify/types/schema";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export type FastifyRequestInfered<TSchema extends FastifySchema> =
  FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
  >;

export type FastifyReplyInfered<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;

export type InferedController<TSchema extends FastifySchema> = (
  req: FastifyRequestInfered<TSchema>,
  res: FastifyReplyInfered<TSchema>,
) => unknown;

export type FastifyController = (
  req: FastifyRequest,
  res: FastifyReply,
) => unknown;

/* Schema Model - TODO remove
  {
    body: Type.Object({
      name: Type.String(),
    }),
    response: {
      200: Type.Object({
        id: Type.Number(),
      }),
    },
    querystring: Type.Object({
      search: Type.String(),
    }),
    params: Type.Object({
      id: Type.Number(),
    }),
    headers: Type.Object({
      "x-foo": Type.String(),
    }),
  }
*/
