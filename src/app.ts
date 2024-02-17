import { userSchemas } from './routes/user/user.schema';
import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie'
import { canvasSchemas } from './routes/canvas/canvas.schema';

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
  fastify.register(cookie, {
    secret: "my-secret", // for cookies signature
    parseOptions: {
      httpOnly: false
    }     // options for parsing cookies
  } as FastifyCookieOptions)
  
  // fastify.register(authenticate)

  // fastify.register(fjwt, { secret: 'my-secret'})
  // fastify.register(jwt, { secret: 'my-secret' })

  // fastify.decorate(
  //   "authenticate",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       await request.jwtVerify();
  //     } catch (e) {
  //       return reply.send(e);
  //     }
  //   }
  // );
  
  for (const schema of [...userSchemas, ...canvasSchemas]) {
    fastify.addSchema(schema)
    
  }

  // fastify.register(user,{
  //   prefix:'/api/users'
  // })
  // fastify.register(canvas,{
  //   prefix:'/api/canvas'
  // })
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

