import { userSchemas } from './routes/user/user.schema';
import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify';
import user from './routes/user';
import fjwt from "@fastify/jwt"

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}
const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {

  // Place here your custom code!
  
  fastify.register(fjwt, {
    secret: 'supersecretdasd'
  });
  fastify.decorate("authenticate", async (request:FastifyRequest, reply:FastifyReply)=> {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  for (const schema of userSchemas) {
    fastify.addSchema(schema)
    
  }

  fastify.register(user,{
    prefix:'/api/users'
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app, options }

